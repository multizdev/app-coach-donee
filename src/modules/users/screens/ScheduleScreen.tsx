import React, { ReactElement } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";

import {
  COLOR_AQUA,
  COLOR_LIGHT_GREEN,
  COLOR_YELLOW,
} from "@src/modules/common/constants";
import HeadingChips from "@src/modules/users/components/elements/chips/HeadingChips";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";

const trainers = [
  { name: "Donee", image: require("@assets/background/coach.webp") },
  { name: "Donee", image: require("@assets/background/coach.webp") },
  { name: "Donee", image: require("@assets/background/coach.webp") },
  { name: "Donee", image: require("@assets/background/coach.webp") },
];

const times = [
  { time: "8:00 am" },
  { time: "9:00 am" },
  { time: "10:00 am" },
  { time: "11:00 am" },
  { time: "12:00 pm" },
  { time: "1:00 pm" },
  { time: "2:00 pm" },
];

function ScheduleScreen(): ReactElement {
  const { replace, dismissAll } = useRouter();

  return (
    <View className="flex-1 w-full p-4 gap-6 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 w-full py-2 gap-4">
          <HeadingChips
            text="SELECT DATE & TIME"
            width={150}
            color={COLOR_YELLOW}
          />
          <Calendar style={{ borderRadius: 10 }} />
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={times}
              renderItem={({ item }) => {
                const { time } = item;
                return (
                  <TouchableOpacity
                    style={{ elevation: 2 }}
                    className="w-[100] h-[40] overflow-hidden rounded-full m-2"
                  >
                    <LinearGradient
                      colors={["#76A9FA", "#98d3ff"]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      className="w-full h-full flex justify-center items-center"
                    >
                      <Text className="text-white">{time}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View
            style={{ elevation: 2, backgroundColor: COLOR_AQUA }}
            className="flex-1 flex-row items-center w-full p-4 rounded-3xl"
          >
            <View className="flex-1 items-center gap-2">
              <HeadingChips
                text="Booking Details"
                width={120}
                color={COLOR_LIGHT_GREEN}
              />
              <Image
                className="contain-content rounded-full border-4 border-white"
                source={require("@assets/background/coach.webp")}
                style={{ width: 80, height: 80 }}
              />
              <Text className="font-bold">Donee</Text>
            </View>
            <View className="flex-1 h-full justify-center items-center gap-2">
              <HeadingChips
                text="Boxing"
                width={120}
                color={COLOR_LIGHT_GREEN}
              />
              <Text>
                <Text className="font-bold">Time:</Text> 9:00 pm
              </Text>
              <Text>
                <Text className="font-bold">Date:</Text> 2024-08-24
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <PrimaryButton
        text="Schedule Now"
        onPress={() => {
          dismissAll();
          replace("user/home/(home)/trainers");
        }}
      />
    </View>
  );
}

export default ScheduleScreen;
