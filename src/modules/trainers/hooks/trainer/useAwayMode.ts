import { useMemo, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import useAppStore from "@src/modules/common/stores/useAppStore";
import { stringToDate } from "@server/utils/date";

function getDate(daysAhead: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date;
}

function useAwayMode(): {
  isEnabled: boolean;
  startDate: Date;
  endDate: Date;
  isPickerVisible: boolean;
  currentPicker: "start" | "end";
  setEnabled: (enabled: boolean) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  showPicker: (picker: "start" | "end") => void;
  hidePicker: () => void;
  handleConfirm: (selectedDate: Date) => void;
  toggleSwitch: () => void;
  formatDate: (date?: Date) => string;
} {
  const { user, detailedTrainer, setDetailedTrainer } = useAppStore();

  const [isEnabled, setIsEnabled] = useState(
    (detailedTrainer && detailedTrainer?.status === "holiday") || false,
  );

  const [currentStartDate, currentEndDate] = useMemo(() => {
    if (detailedTrainer && detailedTrainer.awayMode) {
      const { startDate, endDate } = detailedTrainer.awayMode;

      return [stringToDate(startDate), stringToDate(endDate)];
    } else {
      return [null, null];
    }
  }, [detailedTrainer]);

  const [startDate, setStartDate] = useState<Date>(
    currentStartDate || getDate(1),
  );

  const [endDate, setEndDate] = useState<Date>(currentEndDate || getDate(2));

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<"start" | "end">("start");

  const showPicker = (picker: "start" | "end") => {
    setCurrentPicker(picker);
    setPickerVisible(true);
  };

  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (selectedDate: Date) => {
    if (currentPicker === "start") {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
    hidePicker();
  };

  const formatDate = (date?: Date): string => {
    if (!date) return "";
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toggleSwitch = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);

    if (!newState) {
      setStartDate(getDate(1));
      setEndDate(getDate(2));
    }

    try {
      if (user) {
        const update: {
          status: "active" | "break" | "holiday";
          awayMode: { startDate: string; endDate: string } | null;
        } = {
          status: newState ? "holiday" : "active",
          awayMode: newState
            ? {
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
              }
            : null,
        };

        await firestore().collection("Trainers").doc(user.uid).update(update);
        setDetailedTrainer({
          ...detailedTrainer!,
          ...update,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setIsEnabled(!newState);
        console.log("Problem changing away mode");
      }
    }
  };

  return {
    isEnabled,
    startDate,
    endDate,
    isPickerVisible,
    currentPicker,
    setEnabled: setIsEnabled,
    setStartDate,
    setEndDate,
    showPicker,
    hidePicker,
    handleConfirm,
    toggleSwitch,
    formatDate,
  };
}

export default useAwayMode;
