import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { Tabs } from "@ant-design/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather } from "@expo/vector-icons";

import useUserBookings from "@src/modules/users/hooks/booking/useUserBookings";
import { Booking, TransformedBooking } from "@server/database/models/Booking";
import {
  COLOR_DARK_BLUE,
  COLOR_DARK_GREEN,
  COLOR_YELLOW,
} from "@src/modules/common/constants";

const tabs = [{ title: "Scheduled Bookings" }, { title: "Completed Bookings" }];

function BookingListComponent({
  type = null,
}: {
  type?: "complete" | null;
}): ReactElement {
  const { allBookings, fetchBookings } = useUserBookings();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  }, []);

  const bookings: TransformedBooking[] = useMemo(() => {
    const transformedBookings = allBookings.map((booking: Booking) => {
      return booking.scheduledDates
        .map((scheduledDate) => {
          const val = {
            id: booking.id,
            serviceId: booking.serviceId,
            serviceName: booking.serviceName,
            trainerId: booking.trainerId,
            userId: booking.userId,
            date: scheduledDate.date,
            time: scheduledDate.time,
            trainer: booking.trainer,
            status: scheduledDate.status,
            selectedPackage: booking.selectedPackage,
            originalBookingDate: booking.date,
          };

          if (type === "complete" && scheduledDate.status === "complete") {
            return val;
          } else if (!type && scheduledDate.status !== "complete") {
            return val;
          } else {
            return null;
          }
        })
        .filter((val) => val !== null);
    });

    return transformedBookings.flat();
  }, [allBookings]);

  return (
    <FlatList
      data={bookings}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item: TransformedBooking, index: number) =>
        `${item.id}${index}`
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ elevation: 4 }}
          className="flex-row items-center justify-between p-4 mx-4 my-2 rounded-xl bg-white"
        >
          <View className="h-full flex-grow flex-col">
            <Text className="font-bold text-gray-500">
              {new Date(item.date).toDateString()} - {item.time}
            </Text>
            <Text className="font-bold text-gray-500 text-lg">
              {item.trainer?.displayName || item.trainer?.fullName}
            </Text>
            <Text className="text-gray-500 text-md">{item.serviceName}</Text>
          </View>
          <View className="items-center gap-2">
            <Text className="font-bold text-gray-500 text-xl">
              AED {item.selectedPackage.price}
            </Text>
            {!type && !item.status && (
              <LinearGradient
                colors={[COLOR_YELLOW, COLOR_YELLOW]}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className="flex-row rounded-full overflow-hidden justify-center items-center py-1 px-2 gap-2"
              >
                <Text className="text-sm text-orange-800">Not confirmed</Text>
                <AntDesign name="warning" size={14} color="rgb(154 52 18)" />
              </LinearGradient>
            )}
            {!type && item.status === "confirmed" && (
              <LinearGradient
                colors={[COLOR_DARK_GREEN, COLOR_DARK_GREEN]}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className="flex-row rounded-full overflow-hidden justify-center items-center py-1 px-2 gap-2"
              >
                <Text className="text-white text-sm">Scheduled</Text>
                <Feather name="user-check" size={16} color="white" />
              </LinearGradient>
            )}
            {type && item.status === "complete" && (
              <LinearGradient
                colors={[COLOR_DARK_BLUE, COLOR_DARK_BLUE]}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className="flex-row rounded-full overflow-hidden justify-center items-center py-1 px-2 gap-2"
              >
                <Text className="text-white text-sm">Completed</Text>
                <AntDesign name="check" size={18} color="white" />
              </LinearGradient>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

function BookingsTab(): ReactElement {
  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <Tabs tabs={tabs}>
        <View className="flex-1 bg-white">
          <BookingListComponent />
        </View>
        <View className="flex-1 bg-white">
          <BookingListComponent type="complete" />
        </View>
      </Tabs>
    </GestureHandlerRootView>
  );
}

export default BookingsTab;
