import React, { ReactElement, useMemo, useRef } from "react";
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
import { Toast } from "@ant-design/react-native";

import { COLOR_LIGHT_GREEN, COLOR_YELLOW } from "@src/modules/common/constants";
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
  const { selectedPackage, serviceName, selectedDate, selectedDates } =
    useBookingStore();

  const { trainer, times, markedDates, scheduleBooking, handleDateSelect } =
    useBookingSchedule();

  if (selectedDate && !markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: SELECTED_COLOR,
    };
  }

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [unscheduled, scheduled] = useMemo(() => {
    const datesArray = Object.entries(selectedDates).filter(
      ([_, time]) => time !== null,
    );

    if (datesArray.length === 0)
      bottomSheetRef.current && bottomSheetRef.current.close();

    return [selectedPackage?.sessions! - datesArray.length, datesArray.length];
  }, [selectedPackage, selectedDates]);

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
              style={[BTN_STYLE_ELEVATION, { backgroundColor: "white" }]}
              className="flex-1 flex-row items-center w-full p-4 rounded-3xl border-2 border-my-green-dark"
              onPress={() => {
                if (Object.entries(selectedDates).length !== 0) {
                  bottomSheetRef!.current!.snapToIndex(0);
                } else {
                  Toast.config({ position: "center" });
                  Toast.show("Please Select Date & Time");
                }
              }}
            >
              <View className="items-center">
                <View
                  className="rounded-full overflow-hidden"
                  style={{ elevation: 4 }}
                >
                  <Image
                    className="contain-content rounded-full border-4 border-white"
                    source={require("@assets/background/coach.webp")}
                    style={{ width: 80, height: 80 }}
                  />
                </View>
                <Text className="font-bold text-xl">
                  {trainer?.displayName || trainer?.fullName}
                </Text>
              </View>
              <View className="flex-grow h-full justify-center items-center gap-2">
                <HeadingChips
                  text={serviceName || ""}
                  width={120}
                  size="text-xs"
                  color={COLOR_LIGHT_GREEN}
                />
                <Text className="text-3xl font-bold text-my-green-dark">
                  {selectedPackage?.price} AED
                </Text>
                <View className="flex-row items-center gap-4">
                  <View className="items-center">
                    <Text className="text-sm font-bold">Scheduled</Text>
                    <Text className="text-2xl font-bold text-my-green-dark">
                      {scheduled}
                    </Text>
                  </View>
                  <View className="w-[1] h-full bg-my-green-dark" />
                  <View className="items-center">
                    <Text className="text-sm font-bold">Unscheduled</Text>
                    <Text className="text-2xl font-bold text-my-green-dark">
                      {unscheduled}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View className="px-2 pb-4">
          <PrimaryButton text={PRIMARY_BTN_TEXT} onPress={scheduleBooking} />
        </View>
      </View>
      <ScheduleBottomSheet bottomSheetRef={bottomSheetRef} />
    </>
  );
}

export default ScheduleScreen;
