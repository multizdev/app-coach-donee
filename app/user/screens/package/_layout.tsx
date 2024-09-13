import React from "react";

import { Stack } from "expo-router";

import { COLOR_BLUE } from "@src/modules/common/constants";

function SelectPackageLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: COLOR_BLUE,
        headerTitle: "Select Package",
      }}
    />
  );
}

export default SelectPackageLayout;
