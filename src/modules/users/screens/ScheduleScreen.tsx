import React, { ReactElement, useRef } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { Calendar, CalendarProps } from "react-native-calendars";
import BottomSheet from "@gorhom/bottom-sheet";

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
import {
  ScheduleTimeChip,
  TimeNotAvailable,
} from "@src/modules/users/components/elements/chips/ScheduleTimeChip";
import ScheduleBottomSheet from "@src/modules/users/components/schedule/ScheduleBottomSheet";

function ScheduleScreen(): ReactElement {
  const {
    selectedPackage,
    serviceName,
    selectedTime,
    selectedDate,
    selectedDates,
  } = useBookingStore();

  const { trainer, times, markedDates, scheduleBooking, handleDateSelect } =
    useBookingSchedule();

  if (selectedDate && !markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: SELECTED_COLOR,
    };
  }

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <>
      <View className="flex-1 gap-2 bg-white">
        <ScrollView showsVerticalScrollIndicator={true}>
          <View className="flex-1 m-4 gap-2">
            <HeadingChips
              text="SELECT DATE & TIME"
              width={150}
              color={COLOR_YELLOW}
            />
            <Calendar
              onDayPress={(day: { dateString: string }) =>
                handleDateSelect(day)
              }
              markedDates={markedDates as CalendarProps["markedDates"]}
            />
            {!times ? (
              <TimeNotAvailable />
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
            <TouchableOpacity
              style={[BTN_STYLE_ELEVATION, { backgroundColor: COLOR_AQUA }]}
              className="flex-1 flex-row items-center w-full p-4 rounded-3xl"
              onPress={() => bottomSheetRef!.current!.snapToIndex(0)}
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
                  <Text className="font-bold">Time:</Text>{" "}
                  {selectedDates[selectedDate || ""] || selectedTime}
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
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View className="p-2">
          <PrimaryButton text={PRIMARY_BTN_TEXT} onPress={scheduleBooking} />
        </View>
      </View>
      <ScheduleBottomSheet bottomSheetRef={bottomSheetRef} />
    </>
  );
}

export default ScheduleScreen;
