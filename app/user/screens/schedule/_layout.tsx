import React, { ReactElement } from "react";

import { Stack } from "expo-router";

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
          title: "Schedule Session",
          animation: "slide_from_right",
        }}
      />
    </>
  );
}

export default ScheduleLayout;
