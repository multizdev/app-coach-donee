import React from "react";

import { Stack } from "expo-router";

import { COLOR_BLUE } from "@src/modules/common/constants";

function SelectTrainerLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: COLOR_BLUE,
        headerTitle: "Select Trainer",
      }}
    />
  );
}

export default SelectTrainerLayout;
