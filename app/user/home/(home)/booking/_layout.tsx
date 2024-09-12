import React, { ReactElement } from "react";

import { Stack } from "expo-router";

import HomeHeader from "@src/modules/common/components/header/HomeHeader";

function BookingsLayout(): ReactElement {
  return (
    <Stack
      screenOptions={() => ({
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
        headerTitle: () => <HomeHeader title="Bookings" />,
      })}
    />
  );
}

export default BookingsLayout;
