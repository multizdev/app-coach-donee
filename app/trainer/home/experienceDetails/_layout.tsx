import React from "react";

import { Stack } from "expo-router";

import HomeHeader from "@src/modules/common/components/header/HomeHeader";

function ExperienceDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "white",
        },
        animation: "slide_from_right",

        headerTitle: () => <HomeHeader title="Experience Details" />,
      }}
    />
  );
}

export default ExperienceDetailsLayout;
