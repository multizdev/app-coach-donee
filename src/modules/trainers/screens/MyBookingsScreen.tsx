import React, { ReactElement } from "react";
import { Text, TouchableOpacity, View, SectionList } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import useMyBookings from "@src/modules/trainers/hooks/booking/useMyBookings";
import DaysHorizontalScroll from "@src/modules/trainers/components/mybookings/DaysHorizontalScroll";
import useBookingsStore from "@src/modules/trainers/store/useBookingsStore";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR_BLUE } from "@src/modules/common/constants";

type Booking = {
  trainer: string;
  price: string;
  currency: string;
  startTime: string;
  endTime: string;
  status: number;
};

type BookingData = { title: string; data: Booking[] };

const bookings: Booking[] = [
  {
    trainer: "Dr. Farah Qadir",
    price: "200.00",
    currency: "AED",
    startTime: "05:00pm",
    endTime: "06:00pm",
    status: 1,
  },
];

function RenderItem({ item }: { item: Booking }): ReactElement {
  return (
    <View className="w-full flex-row items-center justify-between my-2 p-4 rounded-xl border border-gray-200">
      <View className="flex-col gap-1">
        <Text className="text-md text-gray-500">{item.trainer}</Text>
        <Text className="font-bold">
          {item.startTime} - {item.endTime}
        </Text>
      </View>
      <View className="flex-col items-end gap-1">
        <Text className="text-md text-gray-500">
          {item.price} {item.currency}
        </Text>
        <View className="flex flex-row gap-2 bg-primary p-2 rounded-full">
          <Text className="text-xs text-white">Completed</Text>
          <AntDesign name="check" size={12} color="white" />
        </View>
      </View>
    </View>
  );
}

function MyBookingsScreen(): ReactElement {
  const { selectedDate, setSelectedDate } = useBookingsStore();
  const { changeMonth, formatDate } = useMyBookings();

  const handleResetDate = () => {
    setSelectedDate(new Date());
  };

  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
  const weekDates: BookingData[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return { title: date.toDateString(), data: bookings };
  });

  return (
    <View className="flex-1 bg-white gap-2">
      <View className="flex-row justify-center items-center gap-4 py-4 pl-[20]">
        <Text className="font-bold text-3xl color-primary">My Bookings</Text>
        <TouchableOpacity onPress={handleResetDate}>
          <AntDesign name="reload1" size={20} color={COLOR_BLUE} />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center px-4">
        <TouchableOpacity
          className="w-[40] h-[40] rounded-xl overflow-hidden"
          onPress={() => changeMonth(-1)}
        >
          <LinearGradient
            colors={["#76A9FA", "#98d3ff"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="w-full h-full flex justify-center items-center"
          >
            <AntDesign name="left" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
        <Text className="font-bold text-xl text-gray-400">
          {formatDate(selectedDate)}
        </Text>
        <TouchableOpacity
          className="w-[40] h-[40] rounded-xl overflow-hidden"
          onPress={() => changeMonth(1)}
        >
          <LinearGradient
            colors={["#76A9FA", "#98d3ff"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="w-full h-full flex justify-center items-center"
          >
            <AntDesign name="right" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <DaysHorizontalScroll />
      <SectionList
        className="p-4"
        sections={weekDates}
        keyExtractor={(item, index) => item.price + index} // Ensure unique key for each item
        renderItem={({ item }: { item: Booking }) => <RenderItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="font-bold text-lg text-primary">{title}</Text>
        )}
      />
    </View>
  );
}

export default MyBookingsScreen;
