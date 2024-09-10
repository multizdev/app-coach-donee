import React, { ReactElement } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { COLOR_BLUE } from "@src/modules/common/constants";

function ScheduleLayout(): ReactElement {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: COLOR_BLUE,
          title: "Schedule",
          animation: "slide_from_right",
        }}
      />
      <StatusBar style="auto" />
    </>
  );
}

export default ScheduleLayout;
