import React, { ReactElement } from "react";
import {
  ImageBackground,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

function HomeScreen(): ReactElement {
  const { replace } = useRouter();

  const statusBarHeight = StatusBar.currentHeight;

  return (
    <ImageBackground
      source={require("@assets/background/coach.webp")}
      className="flex-1 justify-end items-center"
      imageStyle={{ resizeMode: "cover" }}
    >
      <View
        style={{ paddingTop: statusBarHeight }}
        className="flex-1 w-full justify-center items-center"
      >
        <View className="w-full h-[50] flex justify-center px-4">
          <TouchableOpacity onPress={() => replace("/")}>
            <Icon name="arrow-left" color="#60A5FA" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 w-full mt-[200] items-center">
          <Image
            source={require("@assets/logo.webp")} // Ensure the correct path
            style={{ width: 100, height: 100 }} // Inline styles
            transition={1000}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;
