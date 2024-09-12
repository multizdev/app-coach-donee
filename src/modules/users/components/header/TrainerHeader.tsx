import React, { ReactElement } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR_BLUE, COLOR_DARK_BLUE } from "@src/modules/common/constants";

function TrainerHeader(): ReactElement {
  return (
    <View className="flex-col gap-2 px-4">
      <View className="w-full flex-row items-center gap-4">
        <Text className="font-bold text-2xl text-gray-600">Donee</Text>
        <View className="flex-row items-center gap-2">
          <AntDesign name="star" size={16} color="black" />
          <Text className="text-sm text-gray-500">5.0</Text>
          <Text className="text-sm text-gray-500">(212)</Text>
        </View>
      </View>
      <LinearGradient
        colors={[COLOR_DARK_BLUE, "#98d3ff"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="w-[70] px-2 py-1 rounded-full overflow-hidden flex justify-center items-center bg-primary"
      >
        <Text className="text-white">English</Text>
      </LinearGradient>
      <View className="w-full flex-row items-end justify-between">
        <Text className="text-sm text-gray-500">From AED 200 per session</Text>
        <TouchableOpacity className="flex-row items-end gap-1">
          <Feather name="share" size={24} color={COLOR_DARK_BLUE} />
          <Text className="text-md text-primary-dark">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TrainerHeader;
