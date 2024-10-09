import React, { ReactElement, useMemo } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";

import { ActivityIndicator, Tabs } from "@ant-design/react-native";

import TrainerHeader from "@src/modules/users/components/header/TrainerHeader";
import BioTab from "@src/modules/users/components/trainerDetails/BioTab";
import ReviewTab from "@src/modules/users/components/trainerDetails/ReviewTab";
import MediaTab from "@src/modules/users/components/trainerDetails/MediaTab";
import { COLOR_BLUE } from "@src/modules/common/constants";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";

const tabs = [{ title: "Bio" }, { title: "Reviews" }, { title: "Media" }];

function TrainerScreen(): ReactElement {
  const { back } = useRouter();
  const statusBarHeight = Constants.statusBarHeight;

  const { allTrainers, trainerId } = useBookingStore();

  const trainer = useMemo(() => {
    return allTrainers.find((t) => t.id === trainerId) || null;
  }, [allTrainers, trainerId]);

  return (
    <>
      {trainer ? (
        <ImageBackground
          source={require("@assets/background/coach.webp")}
          className="flex-1 justify-between"
          style={{ paddingTop: statusBarHeight }}
          imageStyle={{ resizeMode: "cover" }}
        >
          <View className="h-[80] flex-row items-center px-4">
            <TouchableOpacity onPress={back}>
              <AntDesign name="arrowleft" size={24} color={COLOR_BLUE} />
            </TouchableOpacity>
          </View>
          <View className="h-[70vh] flex-col py-8 gap-4 bg-white rounded-t-3xl">
            <TrainerHeader trainer={trainer} />
            <Tabs tabs={tabs}>
              <BioTab trainer={trainer} />
              <ReviewTab />
              <MediaTab />
            </Tabs>
          </View>
        </ImageBackground>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
        </View>
      )}
    </>
  );
}

export default TrainerScreen;
