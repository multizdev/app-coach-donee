import React, { ReactElement } from "react";

import { Stack } from "expo-router";

import HomeHeader from "@src/modules/common/components/header/HomeHeader";

function ScheduleLayout(): ReactElement {
  return (
    <Stack
      screenOptions={() => ({
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
        headerTitle: () => <HomeHeader />,
      })}
    />
  );
}

export default ScheduleLayout;
