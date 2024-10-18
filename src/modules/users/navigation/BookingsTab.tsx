import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Tabs, Toast } from "@ant-design/react-native";
import firestore from "@react-native-firebase/firestore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import useUserBookings from "@src/modules/users/hooks/booking/useUserBookings";
import {
  Booking,
  ScheduledDate,
  TransformedBooking,
} from "@server/database/models/Booking";
import {
  COLOR_DARK_BLUE,
  COLOR_DARK_GREEN,
  COLOR_RED,
  COLOR_YELLOW,
} from "@src/modules/common/constants";
import { parse12HourTime } from "@src/util/dateTime";
import { hasTimePassed } from "@src/util/dateHelpers";

const TABS = [{ title: "Scheduled Bookings" }, { title: "Completed Bookings" }];
const COLOR_GRADIENTS = {
  yellow: [COLOR_YELLOW, COLOR_YELLOW],
  green: [COLOR_DARK_GREEN, COLOR_DARK_GREEN],
  blue: [COLOR_DARK_BLUE, COLOR_DARK_BLUE],
};

function transformBookings(
  allBookings: Booking[],
  type?: "complete",
): TransformedBooking[] {
  return allBookings
    .map((booking: Booking, bookingIndex: number): TransformedBooking[] =>
      booking.scheduledDates
        .map((scheduledDate: ScheduledDate): TransformedBooking | null => {
          const transformedBooking: TransformedBooking = {
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
            bookingIndex,
          };
          const isCompletedByTime = hasTimePassed(
            scheduledDate.date,
            scheduledDate.time,
            1.5,
          );
          if (
            type === "complete" &&
            (scheduledDate.status === "complete" || isCompletedByTime)
          ) {
            return transformedBooking;
          } else if (
            !type &&
            scheduledDate.status !== "complete" &&
            !isCompletedByTime
          ) {
            return transformedBooking;
          }
          return null;
        })
        .filter(
          (transformedBooking: TransformedBooking | null) =>
            transformedBooking !== null,
        ),
    )
    .flat();
}

function BookingListComponent({ type }: { type?: "complete" }): ReactElement {
  const { allBookings, fetchBookings } = useUserBookings();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  }, [fetchBookings]);

  const bookings: TransformedBooking[] = useMemo(
    () => transformBookings(allBookings, type),
    [allBookings, type],
  );

  return (
    <FlatList
      contentContainerClassName="pb-20"
      data={bookings}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item, index) => `${item.id}${index}`}
      renderItem={({ item }: { item: TransformedBooking }) => {
        const formattedTime = parse12HourTime(item.time);
        const bookingDateTime = new Date(`${item.date}T${formattedTime}`);
        const currentTime = new Date();
        const timeDifference =
          (bookingDateTime.getTime() - currentTime.getTime()) / 1000 / 3600;
        const isDisabled = timeDifference < 6;

        return (
          <View
            style={{ elevation: 2 }}
            className="mx-4 my-2 rounded-xl bg-white overflow-hidden"
          >
            <View className="flex-row items-center justify-between p-4">
              <View className="h-full flex-grow flex-col">
                <Text className="font-bold text-gray-500">
                  {new Date(item.date).toDateString()} - {item.time}
                </Text>
                <Text className="font-bold text-gray-500 text-lg">
                  {item.trainer?.displayName || item.trainer?.fullName}
                </Text>
                <Text className="text-gray-500 text-md">
                  {item.serviceName}
                </Text>
              </View>
              <View className="items-center gap-2">
                <Text className="font-bold text-gray-500 text-xl">
                  AED {item.selectedPackage.price}
                </Text>
                {!type && !item.status && (
                  <LinearGradient
                    colors={COLOR_GRADIENTS.yellow}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    className="flex-row rounded-full overflow-hidden justify-center items-center py-1 px-2 gap-2"
                  >
                    <Text className="text-sm text-orange-800">
                      Not confirmed
                    </Text>
                    <AntDesign
                      name="warning"
                      size={14}
                      color="rgb(154 52 18)"
                    />
                  </LinearGradient>
                )}
                {!type && item.status === "confirmed" && (
                  <LinearGradient
                    colors={COLOR_GRADIENTS.green}
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
                    colors={COLOR_GRADIENTS.blue}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    className="flex-row rounded-full overflow-hidden justify-center items-center py-1 px-2 gap-2"
                  >
                    <Text className="text-white text-sm">Completed</Text>
                    <AntDesign name="check" size={18} color="white" />
                  </LinearGradient>
                )}
              </View>
            </View>
            {item.status !== "complete" &&
              !hasTimePassed(item.date, item.time) && (
                <TouchableOpacity
                  disabled={isDisabled}
                  className="flex-row justify-center items-center p-2 gap-2 border-0 border-t border-gray-200"
                  onPress={() => {
                    Alert.alert(
                      "Cancel Booking",
                      "Are you sure you want to cancel your booking?",
                      [
                        { text: "No", style: "cancel" },
                        {
                          text: "Cancel Booking",
                          onPress: async () => {
                            if (item.bookingIndex) {
                              // Positive action goes here
                              let tempDates =
                                allBookings[item.bookingIndex].scheduledDates;
                              tempDates = [
                                ...tempDates.filter(
                                  (val) => val.date !== item.date,
                                ),
                              ];
                              try {
                                await firestore()
                                  .collection("Bookings")
                                  .doc(item.id)
                                  .update({
                                    scheduledDates: tempDates,
                                  });
                              } catch (e) {
                                if (e instanceof Error) {
                                  Toast.show(
                                    "Cannot cancel Booking, Please contact us",
                                  );
                                }
                              } finally {
                                await onRefresh();
                              }
                            }
                          },
                          style: "destructive",
                        },
                      ],
                    );
                  }}
                >
                  <Text
                    className={`${
                      !isDisabled ? "text-my-red" : "text-gray-400"
                    } font-bold`}
                  >
                    Cancel
                  </Text>
                  <MaterialCommunityIcons
                    name="book-cancel-outline"
                    size={24}
                    color={!isDisabled ? COLOR_RED : "lightgray"}
                  />
                </TouchableOpacity>
              )}
          </View>
        );
      }}
    />
  );
}

function BookingsTab(): ReactElement {
  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <Tabs tabs={TABS}>
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
