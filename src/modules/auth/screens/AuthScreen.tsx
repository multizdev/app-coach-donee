// ./src/screens/AuthScreen.tsx
import React, { ReactElement, useEffect } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import useAppStore from "@src/modules/common/stores/useAppStore";
import AuthForm from "@src/modules/auth/components/forms/AuthForm";

const AuthScreen = (): ReactElement => {
  const { authState, setAuthState } = useAppStore();

  return (
    <ImageBackground
      source={require("@assets/background/coach.webp")}
      className="flex-1 justify-end items-center"
      imageStyle={{ resizeMode: "cover" }}
    >
      <View className="w-screen h-[65vh] bg-blue-400 overflow-hidden rounded-t-3xl">
        <LinearGradient
          colors={["#60A5FA", "#98d3ff"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="w-full h-[10vh] bg-green-300 flex justify-center items-center gap-2"
        >
          <Text className="text-white font-bold">Welcome to Our GYM</Text>
          <View className="flex flex-row items-center gap-6 text-white">
            <TouchableOpacity onPress={() => setAuthState("login")}>
              <Text
                className={`font-bold ${authState === "login" ? "text-black" : "text-white"}`}
              >
                Login
              </Text>
            </TouchableOpacity>
            <View className="w-[1px] h-full bg-white" />
            <TouchableOpacity onPress={() => setAuthState("register")}>
              <Text
                className={`font-bold ${authState !== "login" ? "text-black" : "text-white"}`}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View className="flex-1 bg-white rounded-t-3xl">
          <AuthForm />
        </View>
      </View>
    </ImageBackground>
  );
};

export default AuthScreen;
