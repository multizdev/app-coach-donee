import React, { ReactElement } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function ScheduleLayout(): ReactElement {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "white",
          },
          title: "Schedule",
          animation: "slide_from_right",
        }}
      />
      <StatusBar style="auto" />
    </>
  );
}

export default ScheduleLayout;
