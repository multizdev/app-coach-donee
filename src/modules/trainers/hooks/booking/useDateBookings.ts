import { useCallback, useEffect, useMemo, useState } from "react";

import firestore from "@react-native-firebase/firestore";
import { Toast } from "@ant-design/react-native";

import useAppStore from "@src/modules/common/stores/useAppStore";
import useBookingsStore from "@src/modules/trainers/store/useBookingsStore";
import { Booking, TransformedBooking } from "@server/database/models/Booking";
import User from "@server/database/models/User";

type BookingData = { title: string; data: TransformedBooking[] };

function useDateBookings() {
  const { user } = useAppStore();

  const [dateBasedBookings, setDateBasedBookings] = useState<Booking[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { selectedDate } = useBookingsStore();

  // Helper function to calculate the start and end of the week
  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Sunday as the start of the week
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday as the end of the week
    return { startOfWeek, endOfWeek };
  };

  const fetchDatesBookings = useCallback(async () => {
    try {
      if (user && selectedDate) {
        setRefreshing(true);

        // Calculate the start and end of the week based on the selected date
        const { startOfWeek, endOfWeek } = getWeekRange(new Date(selectedDate));

        // Firestore query to fetch bookings within the week range
        const bookingsSnapshot = await firestore()
          .collection("Bookings")
          .where("trainerId", "==", user.uid)
          .get();

        const allBookings = bookingsSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
              date: doc.data().date.toDate(), // Convert Firestore Timestamp to JS Date
            }) as Booking,
        );

        // Filter bookings based on the scheduledDates within the week range
        const bookings = allBookings.filter((booking) =>
          booking.scheduledDates.some((scheduledDate) => {
            const bookingDate = new Date(scheduledDate.date);
            return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
          }),
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

          setDateBasedBookings(bookingsWithUsers);
        } else setDateBasedBookings([]);
      }
    } catch (e) {
      Toast.config({ position: "bottom" });
      if (e instanceof Error) {
        Toast.show("Cannot load clients, Please refresh!");
      }
    } finally {
      setRefreshing(false);
    }
  }, []);

  const bookings: TransformedBooking[] = useMemo(() => {
    const transformedBookings = dateBasedBookings.map((booking: Booking) => {
      return booking.scheduledDates.map((scheduledDate) => ({
        id: booking.id,
        serviceId: booking.serviceId,
        serviceName: booking.serviceName,
        trainerId: booking.trainerId,
        userId: booking.userId,
        date: scheduledDate.date,
        time: scheduledDate.time,
        user: booking.user,
        status: booking.status,
        selectedPackage: booking.selectedPackage,
        originalBookingDate: booking.date,
      }));
    });

    return transformedBookings.flat();
  }, [dateBasedBookings]);

  const weekDates: BookingData[] = useMemo(() => {
    // Get the start of the week for reference
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Adjust to the start of the week

    // Create an empty map to store bookings by date
    const bookingsByDate: Record<string, TransformedBooking[]> = {};

    // Iterate through the bookings and group them by the flattened `date` property
    bookings.forEach((booking) => {
      const bookingDate = new Date(booking.date).toDateString(); // Normalize date to avoid time differences
      if (!bookingsByDate[bookingDate]) {
        bookingsByDate[bookingDate] = [];
      }
      bookingsByDate[bookingDate].push(booking); // Group by the normalized date
    });

    // Convert the map to an array of section objects, only for the current week
    const sections: BookingData[] = Array.from({ length: 7 }, (_, i) => {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      const currentDateString = currentDate.toDateString();

      return {
        title: currentDateString, // The date (title of the section)
        data: bookingsByDate[currentDateString] || [], // Bookings for this day (empty if none)
      };
    }).filter((section) => section.data.length > 0); // Filter out empty sections

    return sections;
  }, [bookings, selectedDate]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDatesBookings();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    (async () => onRefresh())();
  }, [selectedDate]);

  return { weekDates, bookings, dateBasedBookings, refreshing, onRefresh };
}

export default useDateBookings;
