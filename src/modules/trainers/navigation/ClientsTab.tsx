import React, { ReactElement } from "react";
import { View, Text, TextInput, FlatList } from "react-native";

import { Fontisto } from "@expo/vector-icons";

import { COLOR_BLUE } from "@src/modules/common/constants";
import useAllBookings from "@src/modules/trainers/hooks/booking/useAllBookings";
import { Booking } from "@server/database/models/Booking";
import { Avatar } from "react-native-paper";

function Client({ item }: { item: Booking }): ReactElement {
  const { user, selectedPackage, scheduledDates } = item;

  return (
    <View
      style={{ elevation: 2 }}
      className="flex-row items-center m-4 mb-1 p-4 gap-4 bg-white rounded-3xl"
    >
      <View
        className="w-[70] h-[70] flex justify-center items-center rounded-full bg-white"
        style={{ elevation: 4 }}
      >
        {user?.photoURL ? (
          <Avatar.Image
            style={{ elevation: 2 }}
            source={{ uri: user?.photoURL || "" }}
            size={60}
          />
        ) : (
          <Avatar.Text
            style={{ elevation: 2, backgroundColor: COLOR_BLUE }}
            size={60}
            color="white"
            label={(user?.displayName || user?.fullName)!
              .charAt(0)
              .toUpperCase()}
          />
        )}
      </View>
      <View className="flex-col">
        <Text className="font-bold text-xl text-gray-500">
          {user?.fullName}
        </Text>
        <Text className="text-sm text-gray-500">
          Scheduled sessions: {scheduledDates.length}
        </Text>
        <Text className="text-sm text-gray-500">
          Unscheduled sessions:{" "}
          {selectedPackage.sessions - scheduledDates.length}
        </Text>
      </View>
    </View>
  );
}

function ClientsTab(): ReactElement {
  const { allBookings, refreshing, onRefresh } = useAllBookings();

  return (
    <View className="flex-1 gap-4 bg-white">
      <View
        style={{ elevation: 4 }}
        className="flex-row items-center m-4 py-2 px-4 gap-4 bg-white rounded-3xl"
      >
        <Fontisto name="search" size={20} color="black" />
        <TextInput className="flex-1 h-10 p-2" placeholder="Search Client" />
      </View>
      <View className="flex-1">
        <FlatList
          data={allBookings}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item: Booking, index: number) => item.id + index}
          renderItem={({ item }: { item: Booking }) => <Client item={item} />}
        />
      </View>
    </View>
  );
}

export default ClientsTab;
