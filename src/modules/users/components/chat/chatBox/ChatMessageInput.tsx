import React, { ReactElement } from "react";

import { TextInput, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function ChatMessageInput(): ReactElement {
  const { push } = useRouter();

  return (
    <View
      className="flex-row items-center px-4 w-full h-[70] bg-white gap-4"
      style={{ elevation: 4 }}
    >
      <TextInput
        className="flex-grow h-[50] bg-gray-100 rounded-full px-4"
        placeholder="Message"
      />
      <TouchableOpacity
        style={{ elevation: 2 }}
        className="w-[50] h-[50] rounded-3xl overflow-hidden"
        onPress={() =>
          push({
            pathname: "user/(home)/chat/[chat_id]",
            params: { chat_id: "Coach Donee" },
          })
        }
      >
        <LinearGradient
          colors={
            ["#60A5FA", "#98d3ff"] /* Corresponds to blue-400 and blue-100 */
          }
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="w-full h-full flex justify-center items-center"
        >
          <Ionicons name="send-outline" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default ChatMessageInput;
