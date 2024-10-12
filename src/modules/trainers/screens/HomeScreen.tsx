import React, { ReactElement } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { COLOR_BLUE } from "@src/modules/common/constants";
import useHome from "@src/modules/trainers/hooks/trainer/useHome";
import useHomeStore from "@src/modules/trainers/store/useHomeStore";

function HomeScreen(): ReactElement {
  const { selectedMonth } = useHomeStore();
  const { changeMonth, formatDate } = useHome();

  return (
    <View className="flex-1 flex-col gap-10 bg-white px-4 py-4">
      <View className="flex-row items-center border-0 border-b border-gray-200 py-6 gap-4">
        <Avatar.Image
          size={100}
          source={require("@assets/activities/gym.webp")}
        />
        <View className="flex-col">
          <Text className="font-bold text-2xl text-gray-500">Don Pradeep</Text>
          <Text className="text-md text-gray-500">Pro Member</Text>
          <View className="flex-row items-center gap-2">
            <Octicons name="dot-fill" size={18} color="green" />
            <Text className="text-md font-bold text-gray-600">Active</Text>
            <FontAwesome name="star" size={16} color={COLOR_BLUE} />
            <Text className="text-md text-gray-600">4.99 (212)</Text>
          </View>
        </View>
      </View>
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          className="w-[40] h-[40] rounded-xl overflow-hidden"
          onPress={() => changeMonth(-1)}
        >
          <LinearGradient
            colors={["#60A5FA", "#98d3ff"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="w-full h-full flex justify-center items-center"
          >
            <AntDesign name="left" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
        <Text className="font-bold text-xl text-gray-400">
          {formatDate(selectedMonth)}
        </Text>
        <TouchableOpacity
          style={{ elevation: 4 }}
          className="w-[40] h-[40] rounded-xl overflow-hidden"
          onPress={() => changeMonth(1)}
        >
          <LinearGradient
            colors={["#60A5FA", "#98d3ff"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="w-full h-full flex justify-center items-center"
          >
            <AntDesign name="right" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-between">
        <LinearGradient
          colors={["#60A5FA", "#98d3ff"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{ elevation: 4 }}
          className="flex-col items-center bg-primary rounded-3xl overflow-hidden p-3 gap-4"
        >
          <Text className="font-bold text-md text-white">
            Scheduled Sessions
          </Text>
          <Text className="font-bold text-6xl text-white">03</Text>
        </LinearGradient>
        <View className="h-full border-0 border-r border-gray-200" />
        <LinearGradient
          colors={["#60A5FA", "#98d3ff"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{ elevation: 4 }}
          className="flex-col items-center bg-primary rounded-3xl overflow-hidden p-3 gap-4"
        >
          <Text className="font-bold text-md text-white">
            Completed Sessions
          </Text>
          <Text className="font-bold text-6xl text-white">17</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

export default HomeScreen;
