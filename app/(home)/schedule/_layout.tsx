import React, { ReactElement } from "react";
import { COLOR_BLUE } from "@src/constants";
import { Stack } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function ScheduleLayout(): ReactElement {
  return (
    <Stack
      screenOptions={() => ({
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
        headerTitle: () => (
          <View className="flex-1 items-center justify-between w-full pr-8">
            <View className="flex-row items-center justify-between w-full pb-4">
              <View className="flex-1 items-start">
                <TouchableOpacity onPress={() => {}}>
                  <MaterialIcons name="menu" size={30} color={COLOR_BLUE} />
                </TouchableOpacity>
              </View>
              <View className="flex-2 items-center">
                <Text className="text-3xl font-bold text-primary">
                  Set Schedule
                </Text>
              </View>
              <View className="flex-1 items-end">
                <TouchableOpacity className="w-[40] h-[40] flex justify-center items-center rounded-2xl">
                  <MaterialIcons
                    name="exit-to-app"
                    size={30}
                    color={COLOR_BLUE}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ),
      })}
    />
  );
}

export default ScheduleLayout;
