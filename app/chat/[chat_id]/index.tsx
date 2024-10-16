import React, { ReactElement, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";

import firestore from "@react-native-firebase/firestore";

import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "@ant-design/react-native";

import MessagesContainer from "@src/modules/users/components/chat/chatBox/MessagesContainer";
import ChatMessageInput from "@src/modules/users/components/chat/chatBox/ChatMessageInput";
import ChatHeader from "@src/modules/users/components/chat/chatBox/ChatHeader";
import { Chat } from "@server/database/models/Chat";
import Trainer from "@server/database/models/Trainer";

function ChatIndex(): ReactElement {
  const statusBarHeight = StatusBar.currentHeight;

  const [chat, setChat] = useState<Chat | null>(null);

  const { chat_id } = useLocalSearchParams();

  useEffect(() => {
    if (chat_id) {
      const unsubscribe = firestore()
        .collection("Chats")
        .doc(chat_id as string)
        .onSnapshot(async (chatSnapshot) => {
          const chatData = { id: chat_id, ...chatSnapshot.data() } as Chat;
          if (chatData) {
            const trainerSnapshot = await firestore()
              .collection("Trainers")
              .doc(chatData.trainerId)
              .get();

            setChat({
              trainer: trainerSnapshot.data() as Trainer,
              ...chatData,
            });
          }
        });

      // Cleanup the subscription on component unmount
      return () => unsubscribe();
    }
  }, [chat_id]);

  if (chat)
    return (
      <View style={{ paddingTop: statusBarHeight }} className="flex-1 bg-white">
        <ChatHeader trainer={chat.trainer} />
        <MessagesContainer messages={chat.messages} />
        <ChatMessageInput chat={chat} />
      </View>
    );

  return (
    <View className="flex-1 bg-white">
      <ActivityIndicator />
    </View>
  );
}

export default ChatIndex;
