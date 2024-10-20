// @src/util/dateTime.ts

const parse12HourTime = (time: string) => {
  return time.replace(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i,
    (_, hour: string, minute: string, period: string) => {
      let parsedHour = parseInt(hour, 10);
      period = period.toUpperCase();

      if (period === "PM" && parsedHour < 12) {
        parsedHour += 12;
      } else if (period === "AM" && parsedHour === 12) {
        parsedHour = 0;
      }

      // Ensure hours are always two digits
      const formattedHour = parsedHour.toString().padStart(2, "0");
      return `${formattedHour}:${minute}:00`;
    },
  );
};

export { parse12HourTime };
