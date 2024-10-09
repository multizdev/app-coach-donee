import React, { ReactElement } from "react";
import { Text, View } from "react-native";

import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { COLOR_BLUE } from "@src/modules/common/constants";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import Trainer from "@server/database/models/Trainer";

function TrainerHeader({ trainer }: { trainer: Trainer }): ReactElement {
  const { push } = useRouter();

  const { fullName, session, rating, packages } = trainer;

  const minimumPricePackage = packages?.reduce(
    (min, pkg) => (pkg.price < min.price ? pkg : min),
    packages[0],
  );

  return (
    <View className="flex-col gap-2 px-4">
      <View className="w-full flex-row justify-between items-center gap-4">
        <View className="flex-row items-center gap-2">
          <Text className="font-bold text-2xl text-gray-600">{fullName}</Text>
          <AntDesign name="star" size={16} color={COLOR_BLUE} />
          <Text className="text-sm text-gray-500">{rating ? rating : 0.0}</Text>
          <Text className="text-sm text-gray-500">
            ({session ? session : 0})
          </Text>
        </View>
      </View>
      <LinearGradient
        colors={[COLOR_BLUE, "#98d3ff"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="w-[70] px-2 py-1 rounded-full overflow-hidden flex justify-center items-center bg-primary"
      >
        <Text className="text-white">English</Text>
      </LinearGradient>
      <View className="w-full flex-row items-end justify-between">
        <Text className="text-sm text-gray-500">
          From AED {minimumPricePackage ? minimumPricePackage.price : 0} per
          session
        </Text>
      </View>
      <PrimaryButton
        text="Book Now"
        size="small"
        onPress={() => push("user/screens/package")}
      />
    </View>
  );
}

export default TrainerHeader;
