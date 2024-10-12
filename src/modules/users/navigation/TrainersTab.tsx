import React, { ReactElement } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";
import { Fontisto } from "@expo/vector-icons";

import useUserBookings from "@src/modules/users/hooks/booking/useUserBookings";
import { Booking } from "@server/database/models/Booking";
import HeadingChips from "@src/modules/users/components/elements/chips/HeadingChips";
import { COLOR_YELLOW } from "@src/modules/common/constants";
import useRescheduleStore from "@src/modules/re-schedule/store/useRescheduleStore";

function TrainerItem({ item }: { item: Booking }): ReactElement {
  const { push } = useRouter();

  const { setBookingId, setTrainer } = useRescheduleStore();

  const { trainer, serviceName, selectedPackage, scheduledDates } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ elevation: 2 }}
      className="flex-row items-center m-4 mb-1 p-4 gap-4 bg-white rounded-3xl"
      onPress={() => {
        setTrainer(trainer!);
        setBookingId(item.id);
        push("/user/screens/re-schedule");
      }}
    >
      <View
        className="w-[70] h-[70] flex justify-center items-center rounded-full bg-white"
        style={{ elevation: 4 }}
      >
        <Image
          className="rounded-full"
          source={require("@assets/background/coach.webp")}
          style={{ width: 60, height: 60 }}
        />
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
          <Text className="text-md text-primary-dark">Sessions Remaining</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function TrainersTab(): ReactElement {
  const { allBookings } = useUserBookings();

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
          keyExtractor={(item: Booking, index: number) => `${item.id}${index}`}
          renderItem={(item) => <TrainerItem item={item.item} />}
        />
      </View>
    </View>
  );
}

export default TrainersTab;
