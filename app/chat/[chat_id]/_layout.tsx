import React, { ReactElement } from "react";

import { Stack } from "expo-router";

function ChatLayout(): ReactElement {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "white",
        },
      }}
    />
  );
}

export default ChatLayout;
