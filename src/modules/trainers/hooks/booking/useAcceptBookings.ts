import { useMemo, useState } from "react";

import firestore from "@react-native-firebase/firestore";
import { Toast } from "@ant-design/react-native";

import { Booking, TransformedBooking } from "@server/database/models/Booking";
import useHomeStore from "@src/modules/trainers/store/useHomeStore";
import useBookingsStore from "@src/modules/trainers/store/useBookingsStore";
import useAllBookings from "@src/modules/trainers/hooks/booking/useAllBookings";

function useAcceptBookings() {
  const { allBookings } = useBookingsStore();
  const { pendingBookings } = useHomeStore();

  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  const { onRefresh } = useAllBookings();

  const currentBooking: TransformedBooking = useMemo(() => {
    return pendingBookings[currentCardIndex];
  }, [currentCardIndex]);

  const confirmSession = async () => {
    Toast.config({ position: "bottom" });

    try {
      const scheduledDates = allBookings.find(
        (booking: Booking) => booking.id === currentBooking.id,
      )?.scheduledDates;

      if (scheduledDates) {
        // Find the index where the date matches
        const scheduleIndex = scheduledDates.findIndex(
          (schedule) => schedule.date === currentBooking.date,
        );

        if (scheduleIndex !== -1) {
          // Create a copy of the scheduledDates array and update the specific object
          const updatedScheduledDates = [...scheduledDates];
          updatedScheduledDates[scheduleIndex] = {
            ...updatedScheduledDates[scheduleIndex],
            status: "confirmed", // Update the status for the matching date
          };

          // Perform the update by replacing the entire scheduledDates array
          await firestore()
            .collection("Bookings")
            .doc(currentBooking.id)
            .update({
              scheduledDates: updatedScheduledDates,
            });

          await onRefresh();
          setCurrentCardIndex(currentCardIndex + 1);
        } else {
          Toast.show("No matching date found.");
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        Toast.show("There was a problem!");
      }
    }
  };

  const rejectSession = async () => {
    Toast.config({ position: "bottom" });

    try {
      let tempDates = allBookings.find(
        (booking: Booking) => booking.id === currentBooking.id,
      )?.scheduledDates;

      const scheduledDates = tempDates;

      if (tempDates) {
        tempDates = [
          ...scheduledDates!.filter((val) => val.date !== currentBooking.date),
        ];

        try {
          await firestore()
            .collection("Bookings")
            .doc(currentBooking.id)
            .update({
              scheduledDates: tempDates,
            });

          await onRefresh();
          setCurrentCardIndex(currentCardIndex + 1);
        } catch (e) {
          if (e instanceof Error) {
            Toast.show("Cannot reject Booking, Please contact us");
          }
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        Toast.show("There was a problem!");
      }
    }
  };

  return { currentBooking, confirmSession, rejectSession };
}

export default useAcceptBookings;
