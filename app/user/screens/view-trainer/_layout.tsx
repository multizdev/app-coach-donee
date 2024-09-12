import React, { ReactElement } from "react";
import { Stack } from "expo-router";
import { COLOR_BLUE } from "@src/modules/common/constants";

function ViewTrainerLayout(): ReactElement {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: COLOR_BLUE,
        title: "Trainer",
        animation: "slide_from_right",
      }}
    />
  );
}

export default ViewTrainerLayout;
