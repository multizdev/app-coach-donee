import { useState } from "react";

import { DaysSelection } from "@src/types";
import useAppStore from "@src/modules/common/stores/useAppStore";

function useTimeSelection(day: keyof DaysSelection) {
  const { daysTimes, setDayTime } = useAppStore();

  // Fallback values if daysTimes[day] is not yet defined for some reason.
  const dayTimes = daysTimes[day] || {
    startTime: new Date(),
    endTime: new Date(),
  };

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<"start" | "end">("start");

  const showPicker = (picker: "start" | "end") => {
    setCurrentPicker(picker);
    setPickerVisible(true);
  };

  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (selectedDate: Date) => {
    if (currentPicker === "start") {
      setDayTime(day, selectedDate, dayTimes.endTime);
    } else {
      setDayTime(day, dayTimes.startTime, selectedDate);
    }
    hidePicker();
  };

  const convertToDate = (timestamp: {
    seconds: number;
    nanoseconds: number;
  }): Date => {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  };

  const formatTime = (date?: any): string => {
    if (!date) return "";

    // If date is a Firestore timestamp object
    if (date.seconds !== undefined && date.nanoseconds !== undefined) {
      date = convertToDate(date);
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12; // convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const amPm = hours < 12 ? "AM" : "PM";
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };

  return {
    startTime: dayTimes.startTime,
    endTime: dayTimes.endTime,
    showPicker,
    formatTime,
    isPickerVisible,
    currentPicker,
    handleConfirm,
    hidePicker,
  };
}

export default useTimeSelection;
