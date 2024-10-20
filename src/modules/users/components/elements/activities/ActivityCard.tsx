import React, { ReactElement } from "react";
import {
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import { Activity } from "@server/database/models/Activity";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";
import { COLOR_DARK_BLUE } from "@src/modules/common/constants";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function ActivityCard({
  item,
}: {
  item: Activity;
  index: number;
  color: string;
}): ReactElement {
  const { setServiceId, setServiceName } = useBookingStore();
  const { push } = useRouter();

  const { id, name } = item;

  const handleActivitySelect = () => {
    setServiceId(id);
    setServiceName(name);
    push("user/screens/trainers");
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: SCREEN_WIDTH,
      }}
      onPress={handleActivitySelect}
    >
      <ImageBackground
        style={{ elevation: 4 }}
        source={require("@assets/background/coach.webp")}
        className="flex-1 m-8 rounded-3xl overflow-hidden bg-white"
        imageStyle={{ resizeMode: "cover" }}
      >
        <LinearGradient
          colors={[COLOR_DARK_BLUE, "rgba(255,255,255,0)"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="w-full flex-1 flex-col justify-end items-end"
        >
          <View className="w-full h-[30%] flex-col px-4">
            <Text className="text-white whitespace-normal text-5xl font-bold text-right">
              {name}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default ActivityCard;
