import React, { ReactElement } from "react";

import { StatusBar, View } from "react-native";

import MessagesContainer from "@src/modules/users/components/chat/chatBox/MessagesContainer";
import ChatMessageInput from "@src/modules/users/components/chat/chatBox/ChatMessageInput";
import ChatHeader from "@src/modules/users/components/chat/chatBox/ChatHeader";

function ChatIndex(): ReactElement {
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <View style={{ paddingTop: statusBarHeight }} className="flex-1 bg-white">
      <ChatHeader />
      <MessagesContainer />
      <ChatMessageInput />
    </View>
  );
}

export default ChatIndex;
