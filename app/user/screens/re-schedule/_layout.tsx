import React, { ReactElement } from "react";
import { TouchableOpacity } from "react-native";

import { Stack, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { COLOR_BLUE } from "@src/modules/common/constants";
import useRescheduleStore from "@src/modules/re-schedule/store/useRescheduleStore";
import { AntDesign } from "@expo/vector-icons";

function ScheduleLayout(): ReactElement {
  const { back } = useRouter();

  const {
    setSelectedDate,
    resetSelectedDates,
    setSelectedTime,
    setBooking,
    setTrainer,
    setTimeSpan,
  } = useRescheduleStore();

  const handleBackPress = () => {
    setSelectedDate(null);
    resetSelectedDates();
    setBooking(null);
    setTrainer(null);
    setSelectedTime(null);
    setTimeSpan(null);
    back();
  };

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: COLOR_BLUE,
          title: "Schedule Sessions",
          animation: "slide_from_right",
          headerLeft: () => (
            <TouchableOpacity
              className="w-[40] h-[40] flex justify-center items-center rounded-2xl"
              onPress={handleBackPress}
            >
              <AntDesign name="arrowleft" size={24} color={COLOR_BLUE} />
            </TouchableOpacity>
          ),
        }}
      />
    </GestureHandlerRootView>
  );
}

export default ScheduleLayout;
