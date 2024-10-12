import { useEffect } from "react";

import firestore from "@react-native-firebase/firestore";
import { Toast } from "@ant-design/react-native";

import { Booking } from "@server/database/models/Booking";
import Trainer from "@server/database/models/Trainer";
import useAppStore from "@src/modules/common/stores/useAppStore";
import useUserBookingStore from "@src/modules/users/stores/bookings/useUserBookingStore";

function useUserBookings() {
  const { user } = useAppStore();

  const { allBookings, setAllBookings, loading, setLoading } =
    useUserBookingStore();

  useEffect(() => {
    (async () => {
      if (user) {
        setLoading(true);

        try {
          const bookingsSnapshot = await firestore()
            .collection("Bookings")
            .where("userId", "==", user.uid)
            .get();

          const bookings = bookingsSnapshot.docs.map(
            (doc) => doc.data() as Booking,
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

            const bookingsWithTrainers = bookings.map((booking) => ({
              ...booking,
              trainer: trainers[booking.trainerId],
            }));

            console.log("BOOKING", bookingsWithTrainers);

            setAllBookings(bookingsWithTrainers);
          }
        } catch (e) {
          if (e instanceof Error) {
            Toast.show("Cannot load bookings!");
          }
        } finally {
          setLoading(false);
        }
      }
    })();
  }, []);

  return { allBookings, loading };
}

export default useUserBookings;
