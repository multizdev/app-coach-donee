import React, { ReactElement } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Activity } from "@server/database/models/Activity";

function ActivityCard({
  item,
  color,
}: {
  item: Activity;
  index: number;
  color: string;
}): ReactElement {
  const { name, categoryName } = item;

  const { push } = useRouter();

  return (
    <TouchableOpacity
      style={{
        elevation: 2,
        backgroundColor: color,
      }}
      className="mb-4 rounded-3xl overflow-hidden"
      onPress={() => push("user/screens/trainers")}
    >
      <LinearGradient
        colors={["#fff", color] /* Corresponds to blue-400 and blue-100 */}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        className="w-full flex-row items-center justify-between px-4 py-4 rounded-3xl overflow-hidden"
      >
        <View className="ml-[55]" />
        <View>
          <Text className="text-xl font-bold">{categoryName}</Text>
          <Text className="text-md text-center">{name}</Text>
        </View>
        <Image
          source={require("@assets/icon/boxing-gloves.png")}
          style={{ width: 55, height: 55 }}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default ActivityCard;
