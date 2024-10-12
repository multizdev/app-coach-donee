import useBookingsStore from "@src/modules/trainers/store/useBookingsStore";

function useMyBookings() {
  const { selectedDate, setSelectedDate } = useBookingsStore();

  const changeMonth = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    const options = { year: "numeric", month: "long" } as const;
    return date.toLocaleDateString("en-US", options);
  };

  return { changeMonth, formatDate, setSelectedDate };
}

export default useMyBookings;
