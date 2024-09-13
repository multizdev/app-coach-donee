import React, { ReactElement } from "react";

import { Stack } from "expo-router";

import HomeHeader from "@src/modules/common/components/header/HomeHeader";

function TrainersLayout(): ReactElement {
  return (
    <Stack
      screenOptions={() => ({
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
        headerTitle: () => <HomeHeader />,
        animation: "slide_from_right",
      })}
    />
  );
}

export default TrainersLayout;
