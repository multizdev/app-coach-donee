import React, { ReactElement } from "react";

import { Stack } from "expo-router";

function AcceptBookingsLayout(): ReactElement {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default AcceptBookingsLayout;
