import React, { ReactElement } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";
import { Chat } from "@server/database/models/Chat";

import useAllTrainerChats from "@src/modules/trainers/hooks/chat/useAllTrainerChats";
import { Avatar } from "react-native-paper";
import { COLOR_BLUE } from "@src/modules/common/constants";

function ChatListItem({ chat }: { chat: Chat }): ReactElement {
  const { push } = useRouter();

  const { user, messages } = chat;

  return (
    <TouchableOpacity
      onPress={() =>
        push({
          pathname: "chat/[chat_id]",
          params: {
            chat_id: chat.id,
            type: "Trainer",
          },
        })
      }
      style={{ elevation: 2 }}
      className="bg-white flex-row h-[70px] items-center gap-4 px-4 rounded-xl"
    >
      {user?.photoURL ? (
        <Avatar.Image
          style={{ elevation: 2 }}
          source={{ uri: user?.photoURL || "" }}
          size={50}
        />
      ) : (
        <Avatar.Text
          style={{ elevation: 2, backgroundColor: COLOR_BLUE }}
          size={50}
          color="white"
          label={
            user?.displayName || user?.fullName
              ? (user?.displayName || user?.fullName)!.charAt(0).toUpperCase()
              : "U"
          }
        />
      )}
      <View className="w-full h-full justify-between py-4">
        <Text className="text-lg font-bold">
          {chat.user?.displayName || chat.user?.fullName}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-md text-gray-600">
            {messages[messages.length - 1].sender === "user"
              ? chat.user?.displayName || chat.user?.fullName
              : "You"}
          </Text>
          <Text className="text-md text-gray-600">
            {messages[messages.length - 1].message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ChatsTab(): ReactElement {
  const { chats, refreshing, onRefresh } = useAllTrainerChats();

  return (
    <View className="flex-1 bg-white">
      <FlatList
        contentContainerClassName="p-4 gap-4"
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={chats}
        renderItem={({ item }) => <ChatListItem chat={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View className="flex-1 bg-white justify-center items-center">
            <Text className="text-2xl text-gray-500">No chat started!</Text>
          </View>
        )}
      />
    </View>
  );
}

export default ChatsTab;
