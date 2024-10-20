import React, { ReactElement } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { useRouter } from "expo-router";
import { AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";

import useUserBookings from "@src/modules/users/hooks/booking/useUserBookings";
import { Booking } from "@server/database/models/Booking";
import HeadingChips from "@src/modules/users/components/elements/chips/HeadingChips";
import {
  COLOR_BLUE,
  COLOR_DARK_BLUE,
  COLOR_YELLOW,
} from "@src/modules/common/constants";
import useRescheduleStore from "@src/modules/re-schedule/store/useRescheduleStore";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";
import { Avatar } from "react-native-paper";

function ItemExpiryDate({ date }: { date: Date }) {
  const futureDate: Date = new Date(date);

  futureDate.setMonth(futureDate.getMonth() + 6);

  return (
    <View className="flex-row items-center gap-2">
      <Text className="text-xs text-primary-dark font-bold">
        Expires on {futureDate.toLocaleDateString()}
      </Text>
    </View>
  );
}

function TrainerItem({ item }: { item: Booking }): ReactElement {
  const { push } = useRouter();

  const { setBookingId, setTrainer } = useRescheduleStore();
  const { setCurrentBooking } = useBookingStore();

  const { trainer, serviceName, selectedPackage, scheduledDates, date } = item;

  return (
    <View
      style={{ elevation: 2 }}
      className="flex flex-col m-4 bg-white rounded-2xl"
    >
      <View className="flex-row items-center px-4 pt-4 gap-4">
        <View
          className="w-[70] h-[70] flex justify-center items-center rounded-full bg-white"
          style={{ elevation: 4 }}
        >
          {trainer?.photoURL ? (
            <Avatar.Image
              style={{ elevation: 2 }}
              source={{ uri: trainer?.photoURL || "" }}
              size={60}
            />
          ) : (
            <Avatar.Text
              style={{ elevation: 2, backgroundColor: COLOR_BLUE }}
              size={60}
              color="white"
              label={(trainer?.displayName || trainer?.fullName)!
                .charAt(0)
                .toUpperCase()}
            />
          )}
        </View>
        <View className="flex-col gap-2">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="font-bold text-2xl text-gray-500">
              {trainer?.displayName || trainer?.fullName}
            </Text>
            <HeadingChips
              text={serviceName}
              width={130}
              size="text-xs"
              color={COLOR_YELLOW}
            />
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-xl font-bold text-primary">
              {selectedPackage.sessions - scheduledDates.length}
            </Text>
            <Text className="text-md text-primary-dark">
              Sessions Remaining
            </Text>
          </View>
          <ItemExpiryDate date={date} />
        </View>
      </View>
      <View className="flex flex-row p-4 gap-2 items-center">
        <TouchableOpacity
          className="flex flex-grow justify-center items-center"
          onPress={() => {
            setTrainer(trainer!);
            setBookingId(item.id);
            push("/user/screens/re-schedule");
          }}
        >
          <AntDesign name="calendar" size={24} color={COLOR_DARK_BLUE} />
          <Text className="text-primary-dark font-bold">Schedule Sessions</Text>
        </TouchableOpacity>
        <View className="w-[1px] h-full bg-gray-300" />
        <TouchableOpacity
          className="flex flex-grow justify-center items-center"
          onPress={async () => {
            setCurrentBooking(item);

            push("/user/screens/package");
          }}
        >
          <MaterialIcons name="autorenew" size={24} color={COLOR_DARK_BLUE} />
          <Text className="text-primary-dark font-bold">Renew Package</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TrainersTab(): ReactElement {
  const { allBookings, onRefresh, refreshing } = useUserBookings();

  return (
    <View className="flex-1 bg-white">
      <View
        style={{ elevation: 2 }}
        className="flex-row items-center m-4 py-2 px-4 gap-4 bg-white rounded-3xl"
      >
        <Fontisto name="search" size={20} color="black" />
        <TextInput className="flex-1 h-10 p-2" placeholder="Search Trainer" />
      </View>
      <View className="flex-1">
        <FlatList
          data={allBookings}
          refreshing={refreshing}
          onRefresh={onRefresh}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item: Booking, index: number) => `${item.id}${index}`}
          renderItem={(item) => <TrainerItem item={item.item} />}
        />
      </View>
    </View>
  );
}

export default TrainersTab;
