import { useEffect, useMemo, useRef } from "react";

import moment from "moment";
import BottomSheet from "@gorhom/bottom-sheet";
import firestore, { Timestamp } from "@react-native-firebase/firestore";

import useRescheduleStore from "@src/modules/re-schedule/store/useRescheduleStore";
import { COLOR_DARK_GREEN } from "@src/modules/common/constants";
import { Booking } from "@server/database/models/Booking";
import { DaysTime, MarkedDatesType, Time } from "@src/types";

function useReschedule() {
  const {
    bookingId,
    booking,
    trainer,
    timeSpan,
    selectedDates,
    setBooking,
    setSelectedDate,
    setSelectedDay,
    setTimeSpan,
    setSelectedTime,
  } = useRescheduleStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleDateSelect = (day: { dateString: string }) => {
    if (!trainer || !trainer.schedule) return;

    // Check if the selected date is disabled
    if (disabledDates?.[day.dateString]) {
      return;
    }

    const date = moment(day.dateString).toDate();
    setSelectedDate(day.dateString);

    const dayOfWeek = moment(date)
      .format("dddd")
      .toLowerCase() as keyof DaysTime;
    setSelectedDay(dayOfWeek);

    const scheduleForDay = trainer.schedule[dayOfWeek];
    if (scheduleForDay?.startTime && scheduleForDay?.endTime) {
      setTimeSpan({
        startTime: (scheduleForDay.startTime as unknown as Timestamp).toDate(),
        endTime: (scheduleForDay.endTime as unknown as Timestamp).toDate(),
      });
    } else {
      setTimeSpan(null);
    }
    setSelectedTime(null); // Reset time
  };

  const times: Time[] | null = useMemo(() => {
    if (!timeSpan) return null;

    const timeSlots = [];
    for (
      let i = timeSpan.startTime.getTime();
      i < timeSpan.endTime.getTime();
      i += 60 * 60 * 1000
    ) {
      const time = new Date(i);
      timeSlots.push({ time: moment(time).format("h:mm a") });
    }
    return timeSlots;
  }, [timeSpan]);

  const markedDates: MarkedDatesType = useMemo(() => {
    return Object.keys(selectedDates)
      .filter((date) => selectedDates[date]) // Only include dates with selected time
      .reduce((acc, date) => {
        acc[date] = {
          selected: true,
          marked: true,
          selectedColor: COLOR_DARK_GREEN,
        };

        return acc;
      }, {} as MarkedDatesType);
  }, [selectedDates]);

  const disabledDates = useMemo(() => {
    if (booking) {
      const { scheduledDates } = booking;

      return scheduledDates.reduce(
        (
          acc: Record<string, { disabled: boolean; marked: true }>,
          { date },
        ) => {
          acc[date] = { disabled: true, marked: true };
          return acc;
        },
        {},
      );
    }
  }, [booking]);

  const [unscheduled, scheduled, filteredSelectedDates] = useMemo(() => {
    if (booking) {
      const { scheduledDates } = booking;

      const datesArray = Object.entries({
        ...scheduledDates,
        ...selectedDates,
      }).filter(([_, time]) => time !== null);

      if (datesArray.length === 0)
        bottomSheetRef.current && bottomSheetRef.current.close();

      return [
        booking.selectedPackage.sessions! - datesArray.length,
        datesArray.length,
        datesArray,
      ];
    }
    return [null, null, null];
  }, [selectedDates, booking]);

  useEffect(() => {
    if (bookingId) {
      (async () => {
        const bookingSnapshot = await firestore()
          .collection("Bookings")
          .doc(bookingId)
          .get();

        setBooking(bookingSnapshot.data() as Booking);
      })();
    }
  }, [bookingId]);

  return {
    trainer,
    times,
    markedDates,
    unscheduled,
    scheduled,
    filteredSelectedDates,
    bottomSheetRef,
    disabledDates,
    handleDateSelect,
  };
}

export default useReschedule;
