import { useCallback, useEffect, useState } from "react";

import firestore, { Timestamp } from "@react-native-firebase/firestore";

import useAppStore from "@src/modules/common/stores/useAppStore";
import { Booking } from "@server/database/models/Booking";
import useBookingsStore from "@src/modules/trainers/store/useBookingsStore";
import User from "@server/database/models/User";
import { Toast } from "@ant-design/react-native";

function useAllBookings() {
  const { user } = useAppStore();

  const { allBookings, setAllBookings } = useBookingsStore();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchAllBookings = async () => {
    try {
      if (user) {
        setRefreshing(true);
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
            (acc, userDoc) => {
              acc[userDoc.id] = userDoc.data() as User;
              return acc;
            },
            {} as Record<string, User>,
          );

          const bookingsWithUsers: Booking[] = bookings.map((booking) => ({
            ...booking,
            user: users[booking.userId],
          })) as Booking[];

          setAllBookings(bookingsWithUsers);
        } else setAllBookings([]);
      }
    } catch (e) {
      Toast.config({ position: "bottom" });
      if (e instanceof Error) {
        Toast.show("Cannot load clients, Please refresh!");
      }
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllBookings();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (user) {
      (async () => fetchAllBookings())();
    }
  }, [user]);

  return { allBookings, refreshing, onRefresh };
}

export default useAllBookings;
