import React, { ReactElement, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons"; // Assuming you're using Ionicons

import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import { COLOR_BLUE } from "@src/modules/common/constants";
import { useRouter } from "expo-router";

type Package = {
  sessions: number;
  pricePerSession: number;
};

const packages: Package[] = [
  { sessions: 1, pricePerSession: 300 },
  { sessions: 5, pricePerSession: 280 },
  { sessions: 8, pricePerSession: 260 },
  { sessions: 12, pricePerSession: 240 },
  { sessions: 24, pricePerSession: 220 },
  { sessions: 36, pricePerSession: 200 },
];

function SelectPackageScreen(): ReactElement {
  const { push } = useRouter();

  const [selectedPackage, setSelectedPackage] = useState<Package>(packages[0]);

  const renderItem = ({ item }: { item: Package }) => (
    <TouchableOpacity
      style={{
        elevation: 4,
        borderColor: selectedPackage === item ? COLOR_BLUE : "white",
        borderWidth: 2,
      }}
      className="flex-row items-center bg-white h-[60] p-2 px-4 m-2 rounded-2xl gap-4"
      onPress={() => setSelectedPackage(item)}
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
      <Text className="text-md">{`AED ${item.pricePerSession} / session`}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 justify-between bg-white">
      <View className="flex-1 p-4">
        <FlatList
          data={packages}
          renderItem={renderItem}
          keyExtractor={(item) => item.sessions.toString()}
        />
      </View>
      <View className="flex-col w-full p-4 gap-2">
        <View className="flex-row items-center justify-between px-4">
          <Text className="font-bold text-xl text-primary">Total Amount</Text>
          <Text className="text-xl">
            AED {selectedPackage.pricePerSession * selectedPackage.sessions}
          </Text>
        </View>
        <PrimaryButton
          text="Checkout"
          onPress={() => push("user/screens/schedule")}
        />
      </View>
    </View>
  );
}

export default SelectPackageScreen;
