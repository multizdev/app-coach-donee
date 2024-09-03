import React, { ReactElement } from "react";
import { Stack } from "expo-router";

function ChatLayout(): ReactElement {
  return (
    <Stack
      screenOptions={() => ({
        headerShown: false,
        animation: "slide_from_right",
      })}
    />
  );
}

export default ChatLayout;
