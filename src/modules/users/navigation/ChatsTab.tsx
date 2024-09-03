import React, { ReactElement } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

import { Tabs } from "@ant-design/react-native";
import { FontAwesome } from "@expo/vector-icons";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useRouter } from "expo-router";

type Chat = {
  id: string;
  name: string;
};

const tabs = [{ title: "Your Trainers" }, { title: "Other Trainers" }];

const chats: Chat[] = [
  { id: "1", name: "Coach Done" },
  { id: "2", name: "Chat 2" },
  { id: "3", name: "Chat 3" },
];

const RightActions = () => {
  return (
    <View className="bg-red-500 justify-center items-center w-16 rounded-lg my-2">
      <FontAwesome name="trash" size={24} color="white" />
    </View>
  );
};

function ChatListItem({ chat }: { chat: Chat }): ReactElement {
  const { push } = useRouter();

  return (
    <Swipeable renderRightActions={RightActions} rightThreshold={64}>
      <TouchableOpacity
        onPress={() =>
          push({
            pathname: "chat/[trainer_id]",
            params: {
              trainer_id: "Coach Donee",
            },
          })
        }
        className="bg-white flex-row h-[70px] items-center gap-4 px-4 rounded-xl border border-gray-300"
      >
        <Image
          className="rounded-full border-2 border-gray-200"
          source={require("@assets/background/coach.webp")}
          style={{ width: 55, height: 55 }}
        />
        <View className="w-full h-full justify-between py-4">
          <Text className="text-lg font-bold">{chat.name}</Text>
          <Text className="text-md text-gray-600">Last message from coach</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const ChatListComponent = () => {
  return (
    <FlatList
      contentContainerClassName="gap-4"
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

function ChatsTab() {
  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <Tabs tabs={tabs}>
        <View className="flex-1 bg-white p-4">
          <ChatListComponent />
        </View>
        <View className="flex-1 bg-white p-4">
          <ChatListComponent />
        </View>
      </Tabs>
    </GestureHandlerRootView>
  );
}

export default ChatsTab;
