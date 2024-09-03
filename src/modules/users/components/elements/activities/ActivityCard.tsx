import React, { ReactElement } from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { Activity } from "@src/types";
import { useRouter } from "expo-router";

function ActivityCard({
  item,
  index,
}: {
  item: Activity;
  index: number;
}): ReactElement {
  const { name, background, image, category } = item;

  const { push } = useRouter();

  return (
    <TouchableOpacity
      style={{
        height: 250,
        elevation: 2,
        marginBottom: 40,
        borderRadius: 40,
        backgroundColor: background,
      }}
      className="flex-1 flex-row w-full relative overflow-hidden"
      onPress={async (): Promise<void> => {}}
    >
      {index === 0 && (
        <Image source={image} style={{ width: 200, height: "auto" }} />
      )}
      {index === 1 && (
        <Image
          source={require("@assets/activities/coach_donee_blue.png")}
          style={{
            width: 250,
          }}
        />
      )}
      {index === 2 && (
        <Image
          source={require("@assets/activities/coach_donee_3.png")}
          style={{
            width: 250,
            height: "auto",
            bottom: -20,
          }}
        />
      )}
      <View className="flex-1 justify-end items-center gap-4 pb-8">
        <View
          className={`flex-1 ${index === 2 ? "justify-end" : "justify-center"} items-center`}
        >
          <Text className="text-2xl font-bold">{category}</Text>
          <Text className="text-xl text-center">{name}</Text>
        </View>
        <TouchableOpacity
          className="p-4 bg-white rounded-full"
          style={{ elevation: 4 }}
          onPress={() => push("user/booking")}
        >
          <Text className="text-md font-bold">Schedule</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default ActivityCard;
