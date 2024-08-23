import React, { ReactElement } from "react";

import { Stack } from "expo-router";

// Import your global CSS file
import "../global.css";

function RootLayout(): ReactElement {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "white",
        },
        title: "Welcome",
        animation: "slide_from_right",
      }}
    />
  );
}

export default RootLayout;
