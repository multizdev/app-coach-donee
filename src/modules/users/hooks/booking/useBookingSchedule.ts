import { useMemo, useState } from "react";
import moment from "moment/moment";
import { Timestamp } from "@react-native-firebase/firestore";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";
import Trainer from "@server/database/models/Trainer";
import { DaysTime } from "@src/types";

const getFormattedDate = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const INITIAL_DATE = getFormattedDate(new Date());
const INITIAL_DAY = moment().format("dddd").toLowerCase() as keyof DaysTime;

function useBookingSchedule() {
  const { allTrainers, trainerId } = useBookingStore();
  const [selectedDate, setSelectedDate] = useState<string>(INITIAL_DATE);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>(INITIAL_DAY);
  const [timeSpan, setTimeSpan] = useState<{
    startTime: Date;
    endTime: Date;
  } | null>(null);

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

  const times: { time: string }[] | null = useMemo(() => {
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

  return {
    trainer,
    times,
    handleDateSelect,
    selectedDate,
    selectedTime,
    selectedDay,
    setSelectedTime,
  };
}

export default useBookingSchedule;
