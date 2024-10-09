import React, { ReactElement } from "react";

import { Stack } from "expo-router";

import HomeHeader from "@src/modules/common/components/header/HomeHeader";
import UserHomeHeader from "@src/modules/users/components/header/UserHomeHeader";

function HomeLayout(): ReactElement {
  return (
    <Stack
      screenOptions={() => ({
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
        headerTitle: () => <HomeHeader search={<UserHomeHeader />} />,
        animation: "slide_from_right",
      })}
    />
  );
}

export default HomeLayout;
