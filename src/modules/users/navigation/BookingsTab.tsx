import React, { ReactElement } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { Tabs } from "@ant-design/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

type Chat = {
  id: string;
  name: string;
};

const tabs = [{ title: "Scheduled Bookings" }, { title: "Completed Bookings" }];

const bookings: Chat[] = [
  { id: "1", name: "Coach Done" },
  { id: "2", name: "Chat 2" },
  { id: "3", name: "Chat 3" },
];

const BookingListComponent = () => {
  return (
    <FlatList
      contentContainerClassName="gap-4"
      data={bookings}
      renderItem={({ item }) => (
        <TouchableOpacity className="w-full flex-row items-center justify-between p-4 rounded-xl bg-gray-100">
          <View className="h-full flex-grow flex-col">
            <Text className="font-bold text-gray-500">
              Tue, 03 Sep . 7:00pm - 8:00pm
            </Text>
            <Text className="font-bold text-gray-500 text-lg">Coach Donee</Text>
            <Text className="text-gray-500 text-md">Personal Training</Text>
          </View>
          <View className="h-full">
            <LinearGradient
              colors={
                [
                  "#60A5FA",
                  "#98d3ff",
                ] /* Corresponds to blue-400 and blue-100 */
              }
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              className="rounded-full overflow-hidden w-[80] justify-center items-center py-1"
            >
              <Text className="text-white text-sm">AED 200</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

function BookingsTab(): ReactElement {
  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <Tabs tabs={tabs}>
        <View className="flex-1 bg-white p-4">
          <BookingListComponent />
        </View>
        <View className="flex-1 bg-white p-4">
          <BookingListComponent />
        </View>
      </Tabs>
    </GestureHandlerRootView>
  );
}

export default BookingsTab;
