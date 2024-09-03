import React, { ReactElement } from "react";
import { COLOR_BLUE } from "src/modules/common/constants";
import { Stack } from "expo-router";
import { TouchableOpacity, View, Image, TextInput } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import MainFilter from "@src/modules/users/components/filters/MainFilter";
import { LinearGradient } from "expo-linear-gradient";

function HomeLayout(): ReactElement {
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
                <Image
                  source={require("@assets/logo.webp")}
                  className="w-[60] h-[40]"
                  resizeMode="contain"
                />
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
            <View className="flex-row items-center justify-between pb-4 gap-4">
              <View className="flex-grow rounded-full">
                <TextInput
                  className="w-full h-[40] bg-gray-100 rounded-full px-4"
                  placeholder="Search"
                />
              </View>
              <TouchableOpacity className="w-[40] h-[40] bg-primary flex justify-center items-center rounded-2xl overflow-hidden">
                <LinearGradient
                  colors={["#76A9FA", "#98d3ff"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  className="w-full h-full flex justify-center items-center"
                >
                  <FontAwesome name="sliders" size={25} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center pb-2">
              <MainFilter />
            </View>
          </View>
        ),
        animation: "slide_from_right",
      })}
    />
  );
}

export default HomeLayout;
