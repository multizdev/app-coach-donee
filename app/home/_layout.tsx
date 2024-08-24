import React, { ReactElement } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function HomeLayout(): ReactElement {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "white",
          },
          title: "Home",
          animation: "slide_from_right",
        }}
      />
      <StatusBar style="auto" />
    </>
  );
}

export default HomeLayout;
