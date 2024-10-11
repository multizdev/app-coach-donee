import React, { ReactElement, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image } from "react-native";

import { Fontisto } from "@expo/vector-icons";
import useAppStore from "@src/modules/common/stores/useAppStore";
import firestore from "@react-native-firebase/firestore";
import { Booking } from "@server/database/models/Booking";
import Trainer from "@server/database/models/Trainer";

type ClientData = {
  name: string;
  sessions: number;
  image: any;
};

const clients: ClientData[] = [
  {
    name: "Coach Donee",
    sessions: 12,
    image: require("@assets/background/coach.webp"),
  },
];

function TrainerItem({ item }: { item: ClientData }): ReactElement {
  return (
    <View
      style={{ elevation: 2 }}
      className="flex-row items-center m-4 mb-1 p-4 gap-4 bg-white rounded-3xl"
    >
      <View
        className="w-[70] h-[70] flex justify-center items-center rounded-full bg-white"
        style={{ elevation: 4 }}
      >
        <Image
          className="rounded-full"
          source={item.image}
          style={{ width: 60, height: 60 }}
        />
      </View>
      <View className="flex-col">
        <Text className="font-bold text-xl text-gray-500">{item.name}</Text>
        <Text className="text-sm text-gray-500">
          Unscheduled sessions: {item.sessions}
        </Text>
      </View>
    </View>
  );
}

function TrainersTab(): ReactElement {
  const { user } = useAppStore();

  useEffect(() => {
    (async () => {
      if (user) {
        const bookingsSnapshot = await firestore()
          .collection("Bookings")
          .where("userId", "==", user.uid)
          .get();

        const bookings = bookingsSnapshot.docs.map(
          (doc) => doc.data() as Booking,
        );
        const trainerIds = bookings.map((booking) => booking.trainerId);

        if (trainerIds.length) {
          const trainersSnapshot = await firestore()
            .collection("Trainers")
            .where(firestore.FieldPath.documentId(), "in", trainerIds)
            .get();

          const trainers = trainersSnapshot.docs.reduce(
            (acc, trainerDoc) => {
              acc[trainerDoc.id] = trainerDoc.data();
              return acc;
            },
            {} as Record<string, Trainer>,
          );

          const bookingsWithTrainers = bookings.map((booking) => ({
            ...booking,
            trainer: trainers[booking.trainerId],
          }));

          console.log(bookingsWithTrainers);
        }
      }
    })();
  }, []);

  return (
    <View className="flex-1 gap-4 bg-white">
      <View
        style={{ elevation: 4 }}
        className="flex-row items-center m-4 py-2 px-4 gap-4 bg-white rounded-3xl"
      >
        <Fontisto name="search" size={20} color="black" />
        <TextInput className="flex-1 h-10 p-2" placeholder="Search Trainer" />
      </View>
      <View className="flex-1">
        <FlatList
          data={clients}
          keyExtractor={(item: ClientData, index: number) => item.name + index}
          renderItem={({ item }: { item: ClientData }) => (
            <TrainerItem item={item} />
          )}
        />
      </View>
    </View>
  );
}

export default TrainersTab;
