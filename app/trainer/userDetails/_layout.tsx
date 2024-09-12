import React from "react";

import { Stack } from "expo-router";

import HomeHeader from "@src/modules/common/components/header/HomeHeader";

function UserDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "white",
        },
        animation: "slide_from_right",
        headerTitle: () => <HomeHeader title="Personal Details" />,
      }}
    />
  );
}

export default UserDetailsLayout;
