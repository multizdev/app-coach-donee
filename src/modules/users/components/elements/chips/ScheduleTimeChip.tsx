import React, { ReactElement } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import {
  BTN_STYLE_ELEVATION,
  GRADIENT_COLORS_DEFAULT,
  GRADIENT_COLORS_SELECTED,
} from "@src/modules/users/constants";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";
import { Time } from "@src/types";

function ScheduleTimeChip({ item: { time } }: { item: Time }): ReactElement {
  const { selectedDate, selectedDates, addSelectedDate } = useBookingStore();

  const isSelected = selectedDates[selectedDate!] === time;

  return (
    <TouchableOpacity
      style={BTN_STYLE_ELEVATION}
      className="w-[100] h-[40] overflow-hidden rounded-full m-1"
      onPress={() => addSelectedDate(selectedDate!, time)}
    >
      <LinearGradient
        colors={isSelected ? GRADIENT_COLORS_SELECTED : GRADIENT_COLORS_DEFAULT}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="w-full h-full flex justify-center items-center"
      >
        <Text className={isSelected ? "text-white" : "text-black"}>{time}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function TimeNotAvailable() {
  const { selectedDay } = useBookingStore();

  return (
    <View className="flex-1 flex-row items-center justify-center bg-gray-100 p-4 gap-1 rounded-full">
      <Text>Not Available on</Text>
      <Text className="color-primary font-bold">
        {selectedDay?.toUpperCase()}!
      </Text>
    </View>
  );
}

export { ScheduleTimeChip, TimeNotAvailable };
