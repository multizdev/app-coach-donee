import { useMemo, useRef } from "react";

import { useRouter } from "expo-router";
import moment from "moment/moment";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { Toast } from "@ant-design/react-native";

import useBookingStore from "@src/modules/users/stores/home/useBookingStore";
import Trainer from "@server/database/models/Trainer";
import { DaysTime, MarkedDatesType, Time } from "@src/types";
import { COLOR_DARK_GREEN } from "@src/modules/common/constants";
import useAppStore from "@src/modules/common/stores/useAppStore";
import BottomSheet from "@gorhom/bottom-sheet";
import useUserBookings from "@src/modules/users/hooks/booking/useUserBookings";

function useBookingSchedule() {
  const { dismissAll, replace } = useRouter();

  const { user } = useAppStore();

  const {
    allTrainers,
    trainerId,
    timeSpan,
    selectedDates,
    selectedPackage,
    serviceId,
    serviceName,
    currentBooking,
    setTimeSpan,
    setSelectedDay,
    setSelectedDate,
    setSelectedTime,
    resetBookingState,
  } = useBookingStore();

  const trainer: Trainer | null = useMemo(
    () => allTrainers.find((t) => t.id === trainerId) || null,
    [allTrainers, trainerId],
  );

  const handleDateSelect = (day: { dateString: string }) => {
    if (!trainer || !trainer.schedule) return;

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

  const bottomSheetRef = useRef<BottomSheet>(null);

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

  const [unscheduled, scheduled, filteredSelectedDates] = useMemo(() => {
    const datesArray = Object.entries(selectedDates).filter(
      ([_, time]) => time !== null,
    );

    if (datesArray.length === 0)
      bottomSheetRef.current && bottomSheetRef.current.close();

    return [
      selectedPackage?.sessions! - datesArray.length,
      datesArray.length,
      datesArray,
    ];
  }, [selectedPackage, selectedDates]);

  const createBooking = async () => {
    try {
      Toast.config({ position: "center", stackable: false });

      if (
        !user ||
        !trainerId ||
        !serviceId ||
        !serviceName ||
        !selectedPackage
      ) {
        Toast.show("There was a problem");
        return;
      }

      await firestore()
        .collection("Bookings")
        .add({
          trainerId,
          userId: user.uid,
          serviceId,
          serviceName,
          selectedPackage: {
            originalSessions: selectedPackage?.sessions,
            ...selectedPackage,
          },
          date: new Date(),
          scheduledDates: [],
        });
      dismissAll();
      resetBookingState();
      replace("user/home/(home)/trainers");
    } catch (e) {
      if (e instanceof Error) {
        Toast.show("Cannot schedule booking, Please try again!");
      }
    }
  };

  const onRefresh = useUserBookings().onRefresh;

  const renewPackage = async () => {
    try {
      Toast.config({ position: "center", stackable: false });

      if (!user || !selectedPackage || !currentBooking) {
        Toast.show("There was a problem");
        return;
      }

      await firestore()
        .collection("Bookings")
        .doc(currentBooking?.id!)
        .update({
          selectedPackage: {
            originalSessions: selectedPackage.sessions,
            sessions:
              selectedPackage.sessions +
              currentBooking.selectedPackage.sessions!,
            price:
              selectedPackage.price + currentBooking.selectedPackage.price!,
          },
        });

      dismissAll();
      resetBookingState();
      await onRefresh();
    } catch (e) {
      if (e instanceof Error) {
        Toast.show("Cannot schedule booking, Please try again!");
      }
    }
  };

  const scheduleBooking = async () => {
    try {
      Toast.config({ position: "center", stackable: false });

      if (
        !user ||
        !trainerId ||
        !serviceId ||
        !serviceName ||
        !selectedPackage
      ) {
        Toast.show("There was a problem");
        return;
      }

      await firestore()
        .collection("Bookings")
        .add({
          trainerId,
          userId: user.uid,
          serviceId,
          serviceName,
          selectedPackage: {
            originalSessions: selectedPackage?.sessions,
            ...selectedPackage,
          },
          date: new Date(),
          scheduledDates: filteredSelectedDates.map(([date, time]) => ({
            date,
            time,
          })),
        });
      dismissAll();
      resetBookingState();
      replace("user/home/(home)/trainers");
    } catch (e) {
      if (e instanceof Error) {
        Toast.show("Cannot schedule booking, Please try again!");
      }
    }
  };

  return {
    trainer,
    times,
    markedDates,
    unscheduled,
    scheduled,
    filteredSelectedDates,
    bottomSheetRef,
    handleDateSelect,
    scheduleBooking,
    createBooking,
    renewPackage,
  };
}

export default useBookingSchedule;
