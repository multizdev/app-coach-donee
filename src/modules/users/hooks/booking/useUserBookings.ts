import { useEffect } from "react";

import { Toast } from "@ant-design/react-native";
import firestore from "@react-native-firebase/firestore";

import { Booking } from "@server/database/models/Booking";
import Trainer from "@server/database/models/Trainer";
import useAppStore from "@src/modules/common/stores/useAppStore";
import useUserBookingStore from "@src/modules/users/stores/bookings/useUserBookingStore";
import useRescheduleStore from "@src/modules/re-schedule/store/useRescheduleStore";

function useUserBookings() {
  const { user } = useAppStore();

  const { allBookings, setAllBookings, loading, setLoading } =
    useUserBookingStore();

  const { bookingId, trainer } = useRescheduleStore();

  const fetchBookings = async () => {
    if (user) {
      setLoading(true);

      try {
        const bookingsSnapshot = await firestore()
          .collection("Bookings")
          .where("userId", "==", user.uid)
          .get();

        const bookings = bookingsSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as Booking,
        );
        const trainerIds = bookings.map((booking) => booking.trainerId);

        if (trainerIds.length) {
          const trainersSnapshot = await firestore()
            .collection("Trainers")
            .where(firestore.FieldPath.documentId(), "in", trainerIds)
            .get();

          const trainers = trainersSnapshot.docs.reduce(
            (acc, trainerDoc) => {
              acc[trainerDoc.id] = trainerDoc.data() as Trainer;
              return acc;
            },
            {} as Record<string, Trainer>,
          );

          const bookingsWithTrainers: Booking[] = bookings.map((booking) => ({
            ...booking,
            trainer: trainers[booking.trainerId],
          })) as Booking[];

          setAllBookings(bookingsWithTrainers);
        } else setAllBookings([]);
      } catch (e) {
        if (e instanceof Error) {
          Toast.show("Cannot load bookings!");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    (async () => fetchBookings())();
  }, [bookingId, trainer]);

  return { allBookings, loading, fetchBookings };
}

export default useUserBookings;
