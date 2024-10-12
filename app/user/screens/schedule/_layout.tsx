import React, { ReactElement } from "react";
import { TouchableOpacity } from "react-native";

import { Stack, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { COLOR_BLUE } from "@src/modules/common/constants";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";

function ScheduleLayout(): ReactElement {
  const router = useRouter();

  const { resetSelectedDates, setSelectedDate } = useBookingStore();

  const handleBackPress = () => {
    setSelectedDate(null);
    resetSelectedDates();
    router.back();
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
          title: "Schedule Session",
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
