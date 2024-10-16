import React, { ReactElement } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { COLOR_BLUE } from "@src/modules/common/constants";
import Trainer from "@server/database/models/Trainer";
import User from "@server/database/models/User";

function ChatHeader({
  chatUser,
}: {
  chatUser: Trainer | User | undefined;
}): ReactElement | undefined {
  const { back } = useRouter();

  if (chatUser)
    return (
      <View className="flex-row items-center px-4 w-full h-[80] bg-white gap-4 border-0 border-b border-gray-200">
        <TouchableOpacity onPress={back}>
          <AntDesign name="left" size={20} color={COLOR_BLUE} />
        </TouchableOpacity>
        <Image
          className="rounded-full border-2 border-gray-200"
          source={require("@assets/background/coach.webp")}
          style={{ width: 50, height: 50 }}
        />
        <Text className="text-2xl text-primary">{chatUser.fullName}</Text>
      </View>
    );
}

export default ChatHeader;
