import useHomeStore from "@src/modules/trainers/store/useHomeStore";

function useHome() {
  const { selectedMonth, setSelectedMonth } = useHomeStore();

  const changeMonth = (increment: number) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedMonth(newDate);
  };

  const formatDate = (date: Date) => {
    const options = { year: "numeric", month: "long" } as const;
    return date.toLocaleDateString("en-US", options);
  };

  return { changeMonth, formatDate, setSelectedMonth };
}

export default useHome;
