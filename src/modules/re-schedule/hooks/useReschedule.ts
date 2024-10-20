import { useEffect, useMemo, useRef, useState } from "react";

import moment from "moment";
import BottomSheet from "@gorhom/bottom-sheet";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { Toast } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";

import useRescheduleStore from "@src/modules/re-schedule/store/useRescheduleStore";
import { COLOR_DARK_GREEN } from "@src/modules/common/constants";
import { Booking } from "@server/database/models/Booking";
import { DaysTime, MarkedDatesType, Time } from "@src/types";
import { parse12HourTime } from "@src/util/dateTime";

function useReschedule() {
  const { dismissAll } = useRouter();

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
    resetSelectedDates,
    setTrainer,
  } = useRescheduleStore();

  const [scheduling, setScheduling] = useState<boolean>(false);
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

  const scheduleDates = async () => {
    try {
      setScheduling(true);
      Toast.config({ position: "center", stackable: false });

      if (!bookingId) {
        Toast.show("There was a problem");
        setScheduling(false);
        return;
      }
      if (!filteredSelectedDates || filteredSelectedDates?.length === 0) {
        Toast.show("Please schedule at least 1 session");
        setScheduling(false);
        return;
      }

      const finalDates = Object.entries(selectedDates).filter(
        ([_, time]) => time !== null,
      );

      await firestore()
        .collection("Bookings")
        .doc(bookingId)
        .update({
          scheduledDates: [
            ...booking?.scheduledDates!,
            ...finalDates.map(([date, time]) => ({
              date,
              time,
            })),
          ],
        });

      // Schedule notifications
      for (const [date, time] of finalDates) {
        const dateTimeString = `${date}T${parse12HourTime(time!)}`;
        const dateTime = moment(dateTimeString);

        // Schedule notifications at 6 hours, 3 hours, and 1 hour before the session
        const notificationTimes = [
          dateTime.subtract(6, "hours").toDate(),
          dateTime.subtract(3, "hours").toDate(),
          dateTime.subtract(1, "hour").toDate(),
        ];

        for (const notificationTime of notificationTimes) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Session Reminder",
              body: `You have a session scheduled at ${time} on ${date}`,
            },
            trigger: notificationTime,
          });
        }
      }

      // Reset States
      setSelectedDate(null);
      resetSelectedDates();
      setBooking(null);
      setTrainer(null);
      setSelectedTime(null);
      setTimeSpan(null);
      dismissAll();
    } catch (e) {
      if (e instanceof Error) {
        Toast.show("Cannot schedule booking, Please try again!");
      }
    } finally {
      setScheduling(false);
    }
  };

  useEffect(() => {
    Toast.config({ position: "center", stackable: false });
    if (bookingId) {
      (async () => {
        try {
          const bookingSnapshot = await firestore()
            .collection("Bookings")
            .doc(bookingId)
            .get();

          if (bookingSnapshot.exists) {
            const booking = bookingSnapshot.data() as Booking;
            setBooking(booking);
          } else {
            Toast.show("The booking no longer exists!");
            dismissAll();
          }
        } catch (e) {
          if (e instanceof Error) {
            Toast.show("The booking no longer exists!");
            dismissAll();
          }
        }
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
    scheduling,
    setScheduling,
    scheduleDates,
    handleDateSelect,
  };
}

export default useReschedule;
