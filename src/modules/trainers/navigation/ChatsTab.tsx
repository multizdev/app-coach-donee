import React, { ReactElement } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

import { useRouter } from "expo-router";
import { Chat } from "@server/database/models/Chat";

import useAllTrainerChats from "@src/modules/trainers/hooks/chat/useAllTrainerChats";

function ChatListItem({ chat }: { chat: Chat }): ReactElement {
  const { push } = useRouter();

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
      <Image
        className="rounded-full border-2 border-gray-200"
        source={require("@assets/background/coach.webp")}
        style={{ width: 55, height: 55 }}
      />
      <View className="w-full h-full justify-between py-4">
        <Text className="text-lg font-bold">
          {chat.user?.displayName || chat.user?.fullName}
        </Text>
        <Text className="text-md text-gray-600">Last message from coach</Text>
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
