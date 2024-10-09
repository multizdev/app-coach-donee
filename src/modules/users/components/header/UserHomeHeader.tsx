import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

function UserHomeHeader() {
  return (
    <View className="flex-row items-center justify-between pb-4 gap-4">
      <View className="flex-grow rounded-full">
        <TextInput
          style={{ elevation: 4 }}
          className="w-full h-[50] bg-white rounded-2xl px-4"
          placeholder="Search"
        />
      </View>
      <TouchableOpacity
        style={{ elevation: 4 }}
        className="w-[50] h-[50] bg-primary flex justify-center items-center rounded-2xl overflow-hidden"
      >
        <LinearGradient
          colors={["#76A9FA", "#98d3ff"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="w-full h-full flex justify-center items-center"
        >
          <FontAwesome name="search" size={18} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default UserHomeHeader;
