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
  COLOR_BLUE,
  COLOR_LIGHT_BLUE,
  COLOR_LIGHT_GREEN,
  COLOR_YELLOW,
} from "@src/modules/common/constants";
import HeadingChips from "@src/modules/users/components/elements/chips/HeadingChips";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useBookingSchedule from "@src/modules/users/hooks/booking/useBookingSchedule";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";

const SELECTED_COLOR = COLOR_BLUE;
const GRADIENT_COLORS_SELECTED = [COLOR_BLUE, COLOR_LIGHT_BLUE];
const GRADIENT_COLORS_DEFAULT = ["#fff", "#fff"];
const IMAGE_PATH = "@assets/background/coach.webp";
const PRIMARY_BTN_TEXT = "Schedule Now";
const BTN_STYLE_ELEVATION = { elevation: 2 };

function ScheduleScreen(): ReactElement {
  const { replace, dismissAll } = useRouter();
  const {
    trainer,
    times,
    selectedDay,
    selectedDate,
    selectedTime,
    handleDateSelect,
    setSelectedTime,
  } = useBookingSchedule();

  const { selectedPackage, serviceName } = useBookingStore();

  const renderNotAvailable = () => (
    <View className="flex-1 flex-row items-center justify-center bg-gray-100 p-4 gap-1">
      <Text>Not Available on</Text>
      <Text className="color-primary font-bold">
        {selectedDay?.toUpperCase()}!
      </Text>
    </View>
  );

  const renderTimeSlot = ({ item: { time } }: { item: { time: string } }) => {
    const isSelected = time === selectedTime;
    return (
      <TouchableOpacity
        style={BTN_STYLE_ELEVATION}
        className="w-[100] h-[40] overflow-hidden rounded-full m-1"
        onPress={() => setSelectedTime(time)}
      >
        <LinearGradient
          colors={
            isSelected ? GRADIENT_COLORS_SELECTED : GRADIENT_COLORS_DEFAULT
          }
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="w-full h-full flex justify-center items-center"
        >
          <Text className={isSelected ? "text-white" : "text-black"}>
            {time}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

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
              [selectedDate]: {
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
                renderItem={renderTimeSlot}
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
                source={require(IMAGE_PATH)}
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
        <PrimaryButton
          text={PRIMARY_BTN_TEXT}
          onPress={() => {
            dismissAll();
            replace("user/home/(home)/trainers");
          }}
        />
      </View>
    </View>
  );
}

export default ScheduleScreen;
