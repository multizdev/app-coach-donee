import { useCallback, useEffect, useMemo, useState } from "react";

import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { Toast } from "@ant-design/react-native";

import useAppStore from "@src/modules/common/stores/useAppStore";
import { Booking, TransformedBooking } from "@server/database/models/Booking";
import useBookingsStore from "@src/modules/trainers/store/useBookingsStore";
import User from "@server/database/models/User";
import useHomeStore from "@src/modules/trainers/store/useHomeStore";

function useAllBookings() {
  const { user } = useAppStore();

  const { selectedMonth } = useHomeStore();
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

  const [scheduledSessions, unscheduledSessions] = useMemo(() => {
    let totalAssignedSessions = 0;
    let totalScheduledSessions = 0;

    allBookings.forEach((booking: Booking) => {
      // Filter scheduledDates to include only those in the selectedMonth
      const scheduledDatesInMonth = booking.scheduledDates.filter(
        (scheduledDate) => {
          const scheduledDateObj = new Date(scheduledDate.date);
          return (
            scheduledDateObj.getFullYear() === selectedMonth.getFullYear() &&
            scheduledDateObj.getMonth() === selectedMonth.getMonth()
          );
        },
      );

      totalAssignedSessions += booking.selectedPackage.sessions;
      totalScheduledSessions += scheduledDatesInMonth.length;
    });

    return [
      totalScheduledSessions,
      totalAssignedSessions - totalScheduledSessions,
    ];
  }, [allBookings, selectedMonth]);

  const bookingsList: TransformedBooking[] = useMemo(() => {
    const transformedBookings = allBookings.map((booking: Booking) => {
      return booking.scheduledDates.map((scheduledDate) => ({
        id: booking.id,
        serviceId: booking.serviceId,
        serviceName: booking.serviceName,
        trainerId: booking.trainerId,
        userId: booking.userId,
        date: scheduledDate.date,
        time: scheduledDate.time,
        trainer: booking.trainer,
        user: booking.user,
        status: scheduledDate.status,
        selectedPackage: booking.selectedPackage,
        originalBookingDate: booking.date,
      }));
    });

    return transformedBookings.flat();
  }, [allBookings]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllBookings();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (user) {
      (async () => onRefresh())();
    }
  }, [user]);

  return {
    allBookings,
    refreshing,
    onRefresh,
    bookingsList,
    scheduledSessions,
    unscheduledSessions,
  };
}

export default useAllBookings;
