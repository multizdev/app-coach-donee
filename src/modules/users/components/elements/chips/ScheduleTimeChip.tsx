import React, { ReactElement } from "react";
import { Text, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
  BTN_STYLE_ELEVATION,
  GRADIENT_COLORS_DEFAULT,
  GRADIENT_COLORS_SELECTED,
} from "@src/modules/users/constants";
import { Time } from "@src/types";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";

function ScheduleTimeChip({ item: { time } }: { item: Time }): ReactElement {
  const { selectedTime, setSelectedTime } = useBookingStore();

  const isSelected = time === selectedTime;

  return (
    <TouchableOpacity
      style={BTN_STYLE_ELEVATION}
      className="w-[100] h-[40] overflow-hidden rounded-full m-1"
      onPress={() => setSelectedTime(time)}
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

export default ScheduleTimeChip;
