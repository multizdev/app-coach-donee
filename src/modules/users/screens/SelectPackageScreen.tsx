import React, { ReactElement, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { ActivityIndicator, Toast } from "@ant-design/react-native";

import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import { COLOR_BLUE } from "@src/modules/common/constants";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";
import { Package } from "@server/database/models/Package";

function SelectPackageScreen(): ReactElement {
  const { push } = useRouter();

  const { allTrainers, trainerId, selectedPackage, setPackage } =
    useBookingStore();

  const trainer = useMemo(() => {
    return allTrainers.find((t) => t.id === trainerId) || null;
  }, [allTrainers, trainerId]);

  const renderItem = ({ item }: { item: Package }) => (
    <TouchableOpacity
      style={{
        elevation: 4,
        borderColor: selectedPackage === item ? COLOR_BLUE : "white",
        borderWidth: 2,
      }}
      className="flex-row items-center bg-white h-[60] p-2 px-4 m-2 rounded-2xl gap-4"
      onPress={() => setPackage(item)}
    >
      <AntDesign
        name="checkcircleo"
        size={24}
        color={selectedPackage === item ? COLOR_BLUE : "gray"}
      />
      <Text className="text-lg font-bold">{`${item.sessions} ${item.sessions === 1 ? "Session" : "Sessions"}`}</Text>
      <Text
        className={`text-lg font-bold ${selectedPackage === item ? "text-primary" : "text-gray-400"}`}
      >
        -
      </Text>
      <Text className="text-md">{`AED ${(item.price / item.sessions).toFixed(0)} / session`}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {trainer ? (
        <View className="flex-1 justify-between bg-white">
          <View className="flex-1 p-4">
            <FlatList
              data={trainer.packages}
              renderItem={renderItem}
              keyExtractor={(item) => item.sessions.toString()}
            />
          </View>
          <View className="flex-col w-full p-4 gap-2">
            <View className="flex-row items-center justify-between px-4">
              <Text className="font-bold text-xl text-primary">
                Total Amount
              </Text>
              <Text className="text-xl">AED {selectedPackage?.price}</Text>
            </View>
            <PrimaryButton
              text="Checkout"
              onPress={() => {
                Toast.config({ position: "bottom" });
                if (selectedPackage) {
                  push("user/screens/schedule");
                } else {
                  Toast.show("Please select a package");
                }
              }}
            />
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
        </View>
      )}
    </>
  );
}

export default SelectPackageScreen;
