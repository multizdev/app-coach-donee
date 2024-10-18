// src/util/dateHelpers.ts
import { parse12HourTime } from "@src/util/dateTime";

export const hasTimePassed = (
  date: string,
  time: string,
  hours: number = 1.5,
): boolean => {
  const formattedTime = parse12HourTime(time);
  const bookingDateTime = new Date(`${date}T${formattedTime}`);
  const currentTime = new Date();
  const timeDifference =
    (currentTime.getTime() - bookingDateTime.getTime()) / 1000 / 3600;

  return timeDifference > hours;
};
