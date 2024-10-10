import React, { ReactElement, useMemo, useState } from "react";
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

import moment from "moment";

import { Calendar } from "react-native-calendars";

import {
  COLOR_AQUA,
  COLOR_LIGHT_GREEN,
  COLOR_YELLOW,
} from "@src/modules/common/constants";
import HeadingChips from "@src/modules/users/components/elements/chips/HeadingChips";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";
import Trainer from "@server/database/models/Trainer";
import { DaysTime } from "@src/types";

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

  const { allTrainers, trainerId } = useBookingStore();

  const [selectedDate, setSelectedDate] = useState<string>(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  );

  const trainer: Trainer | null = useMemo(() => {
    return allTrainers.find((t) => t.id === trainerId) || null;
  }, [allTrainers, trainerId]);

  const handleDateSelect = (day: { dateString: string }) => {
    if (trainer && trainer.schedule) {
      const { schedule } = trainer;

      const date = moment(day.dateString).toDate();
      setSelectedDate(day.dateString);

      const dayOfWeek = moment(date)
        .format("dddd")
        .toLowerCase() as keyof DaysTime;

      const scheduleForDay = schedule[dayOfWeek];

      if (
        scheduleForDay &&
        scheduleForDay.startTime &&
        scheduleForDay.endTime
      ) {
        const startTime = new Date(
          (scheduleForDay.startTime as any).seconds * 1000 +
            Math.floor((scheduleForDay.endTime as any).nanoseconds / 1000000),
        );
        const endTime = new Date(
          (scheduleForDay.endTime as any).seconds * 1000 +
            Math.floor((scheduleForDay.endTime as any).nanoseconds / 1000000),
        );

        console.log({
          dayOfWeek,
          startTime,
          endTime,
        });
      } else {
        console.log("No schedule available for this day");
      }
    }
  };

  return (
    <View className="flex-1 w-full p-4 gap-6 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 w-full py-2 gap-4">
          <HeadingChips
            text="SELECT DATE & TIME"
            width={150}
            color={COLOR_YELLOW}
          />
          <Calendar
            style={{ borderRadius: 10 }}
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
          />
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
