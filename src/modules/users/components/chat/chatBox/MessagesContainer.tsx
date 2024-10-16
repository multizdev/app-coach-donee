import React, { ReactElement } from "react";
import { FlatList, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ChatMessage } from "@server/database/models/Chat";

function MessagesContainer({
  messages,
  type,
}: {
  messages: ChatMessage[];
  type: string;
}): ReactElement {
  const renderItem = ({ item }: { item: ChatMessage }): ReactElement => {
    const { sender, message, date } = item;
    const dateObject = date.toDate();

    if (sender === type.toLowerCase()) {
      return (
        <View className="w-full flex-col items-end gap-1">
          <LinearGradient
            colors={["#60A5FA", "#98d3ff"]} // Corresponds to blue-400 and blue-100
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="w-[70%] p-4 border rounded-3xl border-gray-300 overflow-hidden"
          >
            <Text className="text-lg text-white">{message}</Text>
          </LinearGradient>
          <Text className="text-sm text-gray-600">
            {dateObject.toDateString()}
          </Text>
        </View>
      );
    } else {
      return (
        <View className="w-[70%] flex-col gap-1">
          <View className="w-full p-4 border rounded-3xl border-gray-300">
            <Text className="text-lg text-gray-500">{message}</Text>
          </View>
          <Text className="text-sm text-gray-600">
            {dateObject.toDateString()}
          </Text>
        </View>
      );
    }
  };

  return (
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.sender + index}
      contentContainerClassName="flex-grow justify-end p-4"
    />
  );
}

export default MessagesContainer;
