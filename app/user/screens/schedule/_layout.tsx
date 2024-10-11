import React, { ReactElement } from "react";

import { Stack } from "expo-router";

import { COLOR_BLUE } from "@src/modules/common/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function ScheduleLayout(): ReactElement {
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
        }}
      />
    </GestureHandlerRootView>
  );
}

export default ScheduleLayout;
