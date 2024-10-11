import { useMemo } from "react";

import { useRouter } from "expo-router";
import moment from "moment/moment";
import { Timestamp } from "@react-native-firebase/firestore";

import useBookingStore from "@src/modules/users/stores/home/useBookingStore";
import Trainer from "@server/database/models/Trainer";
import { DaysTime, Time } from "@src/types";

function useBookingSchedule() {
  const { dismissAll, replace } = useRouter();

  const {
    allTrainers,
    trainerId,
    timeSpan,
    setTimeSpan,
    setSelectedDay,
    setSelectedDate,
    setSelectedTime,
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

  const scheduleBooking = async () => {
    dismissAll();
    replace("user/home/(home)/trainers");
  };

  return {
    trainer,
    times,
    handleDateSelect,
    scheduleBooking,
  };
}

export default useBookingSchedule;
