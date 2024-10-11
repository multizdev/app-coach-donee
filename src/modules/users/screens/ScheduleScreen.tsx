import React, { ReactElement } from "react";
import { View, ScrollView, FlatList, Text, Image } from "react-native";

import { Calendar } from "react-native-calendars";

import {
  COLOR_AQUA,
  COLOR_LIGHT_GREEN,
  COLOR_YELLOW,
} from "@src/modules/common/constants";
import {
  BTN_STYLE_ELEVATION,
  PRIMARY_BTN_TEXT,
  SELECTED_COLOR,
} from "@src/modules/users/constants";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";
import HeadingChips from "@src/modules/users/components/elements/chips/HeadingChips";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useBookingSchedule from "@src/modules/users/hooks/booking/useBookingSchedule";
import ScheduleTimeChip from "@src/modules/users/components/elements/chips/ScheduleTimeChip";

function ScheduleScreen(): ReactElement {
  const {
    selectedPackage,
    serviceName,
    selectedTime,
    selectedDay,
    selectedDate,
  } = useBookingStore();

  const { trainer, times, scheduleBooking, handleDateSelect } =
    useBookingSchedule();

  const renderNotAvailable = () => (
    <View className="flex-1 flex-row items-center justify-center bg-gray-100 p-4 gap-1">
      <Text>Not Available on</Text>
      <Text className="color-primary font-bold">
        {selectedDay?.toUpperCase()}!
      </Text>
    </View>
  );

  return (
    <View className="flex-1 gap-2 bg-white">
      <ScrollView showsVerticalScrollIndicator={true}>
        <View className="flex-1 m-4 gap-2">
          <HeadingChips
            text="SELECT DATE & TIME"
            width={150}
            color={COLOR_YELLOW}
          />
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate!]: {
                selected: true,
                marked: true,
                selectedColor: SELECTED_COLOR,
              },
            }}
          />
          {!times ? (
            renderNotAvailable()
          ) : (
            <View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={times}
                renderItem={(item) => <ScheduleTimeChip item={item.item} />}
              />
            </View>
          )}
          <View
            style={[BTN_STYLE_ELEVATION, { backgroundColor: COLOR_AQUA }]}
            className="flex-1 flex-row items-center w-full p-4 rounded-3xl"
          >
            <View className="flex-1 items-center gap-2">
              <Image
                className="contain-content rounded-full border-4 border-white"
                source={require("@assets/background/coach.webp")}
                style={{ width: 80, height: 80 }}
              />
              <Text className="font-bold">
                {trainer?.displayName || trainer?.fullName}
              </Text>
            </View>
            <View className="flex-1 h-full justify-center gap-2">
              <HeadingChips
                text={serviceName || ""}
                width={120}
                size="text-xs"
                color={COLOR_LIGHT_GREEN}
              />
              <Text className="text-sm">
                <Text className="font-bold">Time:</Text> {selectedTime}
              </Text>
              <Text className="text-sm">
                <Text className="font-bold">Date:</Text> {selectedDate}
              </Text>
              <Text className="text-sm">
                <Text className="font-bold">Sessions:</Text>{" "}
                {selectedPackage?.sessions}
              </Text>
              <Text className="text-3xl font-bold text-my-green-dark">
                {selectedPackage?.price} AED
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="p-2">
        <PrimaryButton text={PRIMARY_BTN_TEXT} onPress={scheduleBooking} />
      </View>
    </View>
  );
}

export default ScheduleScreen;
