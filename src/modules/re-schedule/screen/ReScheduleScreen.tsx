import React, { ReactElement } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Calendar, CalendarProps } from "react-native-calendars";
import { ActivityIndicator } from "@ant-design/react-native";

import HeadingChips from "@src/modules/users/components/elements/chips/HeadingChips";
import { COLOR_LIGHT_GREEN, COLOR_YELLOW } from "@src/modules/common/constants";
import { TimeNotAvailable } from "@src/modules/users/components/elements/chips/ScheduleTimeChip";
import {
  BTN_STYLE_ELEVATION,
  SELECTED_COLOR,
} from "@src/modules/users/constants";
import useRescheduleStore from "@src/modules/re-schedule/store/useRescheduleStore";
import useReschedule from "@src/modules/re-schedule/hooks/useReschedule";
import { ReScheduleTimeChip } from "@src/modules/re-schedule/components/ReScheduleTimeChip";
import ReScheduleBottomSheet from "@src/modules/re-schedule/components/ReScheduleBottomSheet";

function ReScheduleScreen(): ReactElement {
  const { bookingId, booking, trainer, selectedDate } = useRescheduleStore();

  const {
    markedDates,
    times,
    disabledDates,
    scheduled,
    unscheduled,
    bottomSheetRef,
    handleDateSelect,
  } = useReschedule();

  if (selectedDate && !markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: SELECTED_COLOR,
    };
  }

  return (
    <>
      {bookingId && booking && trainer ? (
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
                  onDayPress={(day: { dateString: string }) => {
                    handleDateSelect(day);
                  }}
                  markedDates={{
                    ...(markedDates as CalendarProps["markedDates"]),
                    ...disabledDates,
                  }}
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() + 1))
                      .toISOString()
                      .split("T")[0]
                  }
                />
                {!times ? (
                  <TimeNotAvailable />
                ) : (
                  <View>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={times}
                      renderItem={(item) => (
                        <ReScheduleTimeChip item={item.item} />
                      )}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={[BTN_STYLE_ELEVATION, { backgroundColor: "white" }]}
                  className="flex-1 flex-row items-center w-full p-4 rounded-3xl border-2 border-my-green-dark"
                  onPress={() => {
                    bottomSheetRef!.current!.snapToIndex(0);
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
                      text={booking.serviceName || ""}
                      width={120}
                      size="text-xs"
                      color={COLOR_LIGHT_GREEN}
                    />
                    <Text className="text-3xl font-bold text-my-green-dark">
                      {booking.selectedPackage?.price} AED
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
                          {unscheduled || 0}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
            {/*<View className="px-2 pb-4">
              <PrimaryButton
                text={PRIMARY_BTN_TEXT}
                onPress={scheduleBooking}
              />
            </View>*/}
          </View>
          <ReScheduleBottomSheet bottomSheetRef={bottomSheetRef} />
        </>
      ) : (
        <View className="flex-1 flex-col justify-center items-center">
          <ActivityIndicator />
        </View>
      )}
    </>
  );
}

export default ReScheduleScreen;
