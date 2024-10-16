import React, { ReactElement } from "react";

import { Stack } from "expo-router";

import ChatHeader from "@src/modules/users/components/chat/chatBox/ChatHeader";

function ChatLayout(): ReactElement {
  return (
    <Stack
      screenOptions={() => ({
        headerShown: false,
        headerStyle: { backgroundColor: "white" },
        headerTitle: () => <ChatHeader />,
        animation: "slide_from_right",
      })}
    />
  );
}

export default ChatLayout;
