import React, { ReactElement } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLOR_BLUE } from "@src/modules/common/constants";
import { useRouter } from "expo-router";

function ChatHeader(): ReactElement {
  const { back } = useRouter();

  return (
    <View
      className="flex-row items-center px-4 w-full h-[80] bg-white gap-4"
      style={{ elevation: 4 }}
    >
      <TouchableOpacity onPress={back}>
        <AntDesign name="left" size={20} color={COLOR_BLUE} />
      </TouchableOpacity>
      <Image
        className="rounded-full border-2 border-gray-200"
        source={require("@assets/background/coach.webp")}
        style={{ width: 50, height: 50 }}
      />
      <Text className="text-2xl text-primary">Coach Donee</Text>
    </View>
  );
}

export default ChatHeader;
