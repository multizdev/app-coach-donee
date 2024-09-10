import React, { ReactElement } from "react";
import { TouchableOpacity, View, Image } from "react-native";

import { Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { COLOR_BLUE } from "src/modules/common/constants";

function MyBookingsLayout(): ReactElement {
  return (
    <Stack
      screenOptions={() => ({
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
        headerTitle: () => (
          <View className="flex-row items-center justify-between w-full pr-8">
            <View className="flex-1 items-start">
              <TouchableOpacity onPress={() => {}}>
                <MaterialIcons name="menu" size={30} color={COLOR_BLUE} />
              </TouchableOpacity>
            </View>
            <View className="flex-2 items-center">
              <Image
                source={require("@assets/logo.webp")}
                className="w-[60] h-[60]"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1 items-end">
              <TouchableOpacity onPress={() => {}}>
                <MaterialIcons
                  name="exit-to-app"
                  size={30}
                  color={COLOR_BLUE}
                />
              </TouchableOpacity>
            </View>
          </View>
        ),
        animation: "slide_from_right",
      })}
    />
  );
}

export default MyBookingsLayout;
