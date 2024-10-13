import React, { ReactElement } from "react";
import { Text, TouchableOpacity, View, SectionList } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import useMyBookings from "@src/modules/trainers/hooks/booking/useMyBookings";
import DaysHorizontalScroll from "@src/modules/trainers/components/mybookings/DaysHorizontalScroll";
import useBookingsStore from "@src/modules/trainers/store/useBookingsStore";
import { COLOR_BLUE } from "@src/modules/common/constants";
import { TransformedBooking } from "@server/database/models/Booking";
import useDateBookings from "@src/modules/trainers/hooks/booking/useDateBookings";

function RenderItem({ item }: { item: TransformedBooking }): ReactElement {
  const { user, time, selectedPackage, status } = item;

  return (
    <View
      style={{ elevation: 2 }}
      className="flex-row items-center justify-between my-2 m-2 p-4 rounded-xl border border-gray-200 bg-white"
    >
      <View className="flex-col gap-1">
        <Text className="text-md text-gray-500">{user?.fullName}</Text>
        <Text className="font-bold">{time}</Text>
      </View>
      <View className="flex-col items-center gap-1">
        <Text className="text-md text-gray-500">
          {selectedPackage.price} AED
        </Text>
        {status ? (
          <LinearGradient
            colors={
              [COLOR_BLUE, "#98d3ff"] /* Corresponds to blue-400 and blue-100 */
            }
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="flex flex-row gap-2 bg-primary p-2 px-4 rounded-full overflow-hidden"
          >
            <Text className="text-xs text-white">Completed</Text>
            <AntDesign name="check" size={12} color="white" />
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={
              [COLOR_BLUE, "#98d3ff"] /* Corresponds to blue-400 and blue-100 */
            }
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="flex flex-row gap-2 bg-primary p-2 px-4 rounded-full overflow-hidden"
          >
            <Text className="text-xs text-white">Scheduled</Text>
          </LinearGradient>
        )}
      </View>
    </View>
  );
}

function MyBookingsScreen(): ReactElement {
  const { selectedDate, setSelectedDate } = useBookingsStore();

  const { changeMonth, formatDate } = useMyBookings();
  const { weekDates, refreshing, onRefresh } = useDateBookings();

  const handleResetDate = () => {
    setSelectedDate(new Date());
  };

  return (
    <View className="flex-1 bg-white gap-2">
      <View className="flex-row justify-center items-center gap-4 pt-4 pl-[20]">
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
        <Text className="font-bold text-xl text-gray-500">
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
        className="p-2"
        sections={weekDates}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item: TransformedBooking, index) => item.id + index} // Ensure unique key for each item
        renderItem={({ item }: { item: TransformedBooking }) => (
          <RenderItem item={item} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="font-bold text-lg text-primary mx-2">{title}</Text>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl text-gray-500">
              No booking for selected week!
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export default MyBookingsScreen;
