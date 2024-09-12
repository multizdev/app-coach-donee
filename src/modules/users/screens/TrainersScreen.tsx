import React, { ReactElement } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { COLOR_BLUE } from "@src/modules/common/constants";
import { useRouter } from "expo-router";

type Trainer = {
  name: string;
  rating: number;
  sessions: number;
  image: any;
};

const trainers: Trainer[] = [
  {
    name: "Donee",
    rating: 5.0,
    sessions: 212,
    image: require("@assets/background/coach.webp"),
  },
  {
    name: "Donee",
    rating: 5.0,
    sessions: 212,
    image: require("@assets/background/coach.webp"),
  },
  {
    name: "Donee",
    rating: 5.0,
    sessions: 212,
    image: require("@assets/background/coach.webp"),
  },
  {
    name: "Donee",
    rating: 5.0,
    sessions: 212,
    image: require("@assets/background/coach.webp"),
  },
  {
    name: "Donee",
    rating: 5.0,
    sessions: 212,
    image: require("@assets/background/coach.webp"),
  },
  {
    name: "Donee",
    rating: 5.0,
    sessions: 212,
    image: require("@assets/background/coach.webp"),
  },
];

function TrainersScreen(): ReactElement {
  const { push } = useRouter();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-row flex-wrap justify-center p-4 gap-4">
        {trainers.map(
          ({ name, rating, sessions, image }: Trainer, index: number) => {
            return (
              <TouchableOpacity
                key={name + index}
                style={{ elevation: 4 }}
                className="w-[45%] h-[250] rounded-3xl overflow-hidden bg-gray-400 relative"
                onPress={() => push("user/screens/view-trainer")}
              >
                <Image source={image} className="w-full h-full absolute z-10" />
                <View className="flex-col w-full bg-white p-2 px-4 absolute bottom-0 z-20">
                  <Text className="font-bold text-lg text-gray-500">
                    {name}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <FontAwesome name="star" size={12} color={COLOR_BLUE} />
                      <Text className="text-gray-500 text-sm">
                        {rating} ({sessions})
                      </Text>
                    </View>

                    <Text className="text-gray-500 text-xs">AED 200</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          },
        )}
      </View>
    </ScrollView>
  );
}

export default TrainersScreen;
