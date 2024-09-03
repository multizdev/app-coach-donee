import React, { ReactElement, useState } from "react";
import HeadingChips from "@src/modules/users/components/elements/chips/HeadingChips";
import { COLOR_BLUE } from "@src/modules/common/constants";
import { Switch, View, Text, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";

function AwayMode(): ReactElement {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
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
    return `${month}/${day}/${year}`;
  };

  return (
    <View className="flex-1 gap-6">
      <View className="flex-row items-center justify-between">
        <HeadingChips text="AWAY MODE" width={100} color={COLOR_BLUE} />
        <Switch
          trackColor={{ false: "#a2a2a2", true: COLOR_BLUE }}
          thumbColor="#fff"
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-primary">Start Date</Text>
        <TouchableOpacity
          onPress={() => showPicker("start")}
          className="p-2 rounded-md mx-2"
        >
          <Text>{formatDate(startDate) || "Select Start Date"}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-primary">End Date</Text>
        <TouchableOpacity
          onPress={() => showPicker("end")}
          className="p-2 rounded-md mx-2"
        >
          <Text>{formatDate(endDate) || "Select End Date"}</Text>
        </TouchableOpacity>
      </View>
      {isPickerVisible && (
        <DatePicker
          modal
          open={isPickerVisible}
          date={currentPicker === "start" ? startDate : endDate}
          mode="date" // Only date selection
          onConfirm={handleConfirm}
          onCancel={hidePicker}
        />
      )}
    </View>
  );
}

export default AwayMode;
