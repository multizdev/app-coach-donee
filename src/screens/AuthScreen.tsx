import React, { ReactElement } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Login from "@components/auth/Login";
import useAppStore from "@stores/useAppStore";

function AuthScreen(): ReactElement {
  const { authState, setAuthState } = useAppStore();

  return (
    <ImageBackground
      source={require("@assets/background/coach.webp")}
      className="flex-1 justify-end items-center"
      imageStyle={{ resizeMode: "cover" }} // For background cover effect
    >
      <View className="w-screen h-[60vh] bg-blue-400 rounded-t-3xl">
        <View className="w-full h-[10vh] flex justify-center items-center gap-2">
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
        </View>
        <View className="flex-1 bg-white rounded-t-3xl">
          <Login />
        </View>
      </View>
    </ImageBackground>
  );
}

export default AuthScreen;
