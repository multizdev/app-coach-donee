import React, { ReactElement } from "react";
import HomeScreen from "@src/screens/HomeScreen";
import { View, StatusBar } from "react-native";

function Home(): ReactElement {
  const statusBar = `pt-[${StatusBar.currentHeight}]`;

  return (
    <View className={`flex-1 ${statusBar}`}>
      <HomeScreen />
    </View>
  );
}

export default Home;
