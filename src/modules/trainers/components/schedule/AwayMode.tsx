import React, { ReactElement } from "react";
import { Switch, View, Text, TouchableOpacity } from "react-native";

import DatePicker from "react-native-date-picker";

import HeadingChips from "@src/modules/users/components/elements/chips/HeadingChips";
import useAwayMode from "@src/modules/trainers/hooks/trainer/useAwayMode";
import { COLOR_BLUE } from "@src/modules/common/constants";

function AwayMode(): ReactElement {
  const {
    isEnabled,
    startDate,
    endDate,
    isPickerVisible,
    currentPicker,
    showPicker,
    hidePicker,
    handleConfirm,
    toggleSwitch,
    formatDate,
  } = useAwayMode();

  return (
    <View className="flex-1 gap-6">
      <View className="flex-row items-center justify-between">
        <HeadingChips text="AWAY MODE" width={100} color={COLOR_BLUE} />
        <Switch
          trackColor={{ false: "#a2a2a2", true: COLOR_BLUE }}
          thumbColor="#fff"
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled!}
        />
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-primary">Start Date</Text>
        <TouchableOpacity
          onPress={() => !isEnabled && showPicker("start")}
          className="p-2 rounded-md mx-2"
        >
          <Text>{formatDate(startDate) || "Select Start Date"}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-primary">End Date</Text>
        <TouchableOpacity
          onPress={() => !isEnabled && showPicker("end")}
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
