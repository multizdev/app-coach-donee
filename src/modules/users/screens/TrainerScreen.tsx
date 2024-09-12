import React, { ReactElement } from "react";
import { View, ImageBackground } from "react-native";

import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";

import TrainerHeader from "@src/modules/users/components/header/TrainerHeader";
import { Tabs } from "@ant-design/react-native";
import BioTab from "@src/modules/users/components/trainerDetails/BioTab";
import ReviewTab from "@src/modules/users/components/trainerDetails/ReviewTab";
import MediaTab from "@src/modules/users/components/trainerDetails/MediaTab";

const tabs = [{ title: "Bio" }, { title: "Reviews" }, { title: "Media" }];

function TrainerScreen(): ReactElement {
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <ImageBackground
      source={require("@assets/background/coach.webp")}
      className="flex-1 justify-between"
      style={{ paddingTop: statusBarHeight }}
      imageStyle={{ resizeMode: "cover" }}
    >
      <View className="h-[80] flex-row items-center px-4">
        <AntDesign name="arrowleft" size={24} color="black" />
      </View>
      <View className="h-[70vh] flex-col py-8 gap-4 bg-white rounded-t-3xl">
        <TrainerHeader />
        <Tabs tabs={tabs}>
          <BioTab />
          <ReviewTab />
          <MediaTab />
        </Tabs>
      </View>
    </ImageBackground>
  );
}

export default TrainerScreen;
