import React, { ReactElement } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { COLOR_BLUE } from "@src/modules/common/constants";
import Trainer from "@server/database/models/Trainer";
import useBookingTrainers from "@src/modules/users/hooks/home/booking/useBookingTrainers";
import { ActivityIndicator } from "@ant-design/react-native";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";

function TrainersScreen(): ReactElement {
  const { push } = useRouter();

  const { setTrainerId } = useBookingStore();

  const { allTrainers, loading } = useBookingTrainers();

  return (
    <ScrollView className="flex-1 bg-white">
      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
        </View>
      )}
      {!loading && (
        <View className="flex-row flex-wrap p-4 gap-4">
          {allTrainers.map(({ id, fullName }: Trainer) => {
            return (
              <TouchableOpacity
                key={id}
                style={{ elevation: 4 }}
                className="w-[45%] h-[250] rounded-3xl overflow-hidden bg-gray-400 relative"
                onPress={() => {
                  setTrainerId(id);
                  push("user/screens/view-trainer");
                }}
              >
                <Image
                  source={require("@assets/background/coach.webp")}
                  className="w-full h-full absolute z-10"
                />
                <View className="flex-col w-full bg-white p-2 px-4 absolute bottom-0 z-20">
                  <Text className="font-bold text-lg text-gray-500">
                    {fullName}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <FontAwesome name="star" size={12} color={COLOR_BLUE} />
                      <Text className="text-gray-500 text-sm">
                        {0} ({0})
                      </Text>
                    </View>

                    <Text className="text-gray-500 text-xs">AED 200</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

export default TrainersScreen;
