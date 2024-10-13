import React, { ReactElement } from "react";
import { Text, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import useTimeSelection from "@src/modules/trainers/hooks/schedule/useTimeSelection";
import { DaysSelection } from "@src/types";
import { LinearGradient } from "expo-linear-gradient";

// Define the props for passing the day
type TimeSelectionProps = {
  day: keyof DaysSelection;
};

function TimeSelection({ day }: TimeSelectionProps): ReactElement {
  const {
    formatTime,
    showPicker,
    startTime,
    endTime,
    isPickerVisible,
    currentPicker,
    handleConfirm,
    hidePicker,
  } = useTimeSelection(day);

  return (
    <LinearGradient
      colors={["#76A9FA", "#98d3ff"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      className="flex-row items-center bg-gray-100 p-2 rounded-full overflow-hidden"
    >
      <TouchableOpacity
        onPress={() => showPicker("start")}
        className="p-2 rounded-md mx-2"
      >
        <Text className="text-white font-bold">
          {formatTime(startTime) || "Select Start Time"}
        </Text>
      </TouchableOpacity>
      <Text className="mx-2 text-white">to</Text>
      <TouchableOpacity
        onPress={() => showPicker("end")}
        className="p-2 rounded-md mx-2"
      >
        <Text className="text-white font-bold">
          {formatTime(endTime) || "Select End Time"}
        </Text>
      </TouchableOpacity>

      {isPickerVisible && (
        <DatePicker
          modal
          open={isPickerVisible}
          date={currentPicker === "start" ? startTime : endTime}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hidePicker}
        />
      )}
    </LinearGradient>
  );
}

export default TimeSelection;
