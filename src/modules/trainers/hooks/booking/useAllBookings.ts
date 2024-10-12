import useAppStore from "@src/modules/common/stores/useAppStore";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { Booking } from "@server/database/models/Booking";
import Trainer from "@server/database/models/Trainer";
import useBookingsStore from "@src/modules/trainers/store/useBookingsStore";

function useAllBookings() {
  const { user } = useAppStore();

  const { allBookings, setAllBookings } = useBookingsStore();

  const fetchAllBookings = async () => {
    if (user) {
      const bookingsSnapshot = await firestore()
        .collection("Bookings")
        .where("trainerId", "==", user.uid)
        .get();

      const bookings = bookingsSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            date: (doc.data().date as Timestamp).toDate(),
          }) as Booking,
      );

      const userIds = bookings.map((booking) => booking.userId);

      if (userIds.length) {
        const usersSnapshot = await firestore()
          .collection("Users")
          .where(firestore.FieldPath.documentId(), "in", userIds)
          .get();

        const users = usersSnapshot.docs.reduce(
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
    }
  };
}

export default useAllBookings;
