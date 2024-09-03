import React, { ReactElement } from "react";
import { ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function MessagesContainer(): ReactElement {
  return (
    <ScrollView className="flex-grow flex-col-reverse p-4">
      <View className="w-[70%] flex-col gap-1">
        <View className="w-full p-4 border rounded-3xl border-gray-300">
          <Text className="text-lg text-gray-500">Message from coach</Text>
        </View>
        <Text className="text-sm text-gray-600">6:41pm</Text>
      </View>
      <View className="w-full flex-col items-end gap-1">
        <LinearGradient
          colors={
            ["#60A5FA", "#98d3ff"] /* Corresponds to blue-400 and blue-100 */
          }
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="w-[70%] p-4 border rounded-3xl border-gray-300 overflow-hidden"
        >
          <Text className="text-lg text-white">Message from user</Text>
        </LinearGradient>
        <Text className="text-sm text-gray-600">6:41pm</Text>
      </View>
    </ScrollView>
  );
}

export default MessagesContainer;
