import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { verifyInstallation } from "nativewind";

function AuthScreen(): ReactElement {
  verifyInstallation();

  return (
    <View className="flex-1 bg-black justify-center items-center">
      <Text className="text-white">
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default AuthScreen;
