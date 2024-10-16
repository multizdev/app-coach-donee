import React from "react";

import { Stack } from "expo-router";

import HomeHeader from "@src/modules/common/components/header/HomeHeader";

function EditAvailabilityLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "white",
        },
        animation: "slide_from_right",
        headerTitle: () => <HomeHeader title="Set Schedule" />,
      }}
    />
  );
}

export default EditAvailabilityLayout;
