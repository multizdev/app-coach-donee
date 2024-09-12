import React, { ReactElement } from "react";
import { View, Text, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLOR_DARK_BLUE } from "@src/modules/common/constants";

type Review = {
  name: string;
  message: string;
};

const customerReviews: Review[] = [
  { name: "Amine", message: "Excellent Trainer!" },
  { name: "David", message: "Top guy" },
  { name: "David", message: "Top guy" },
];

const size = 16;

function RatingSection(): ReactElement {
  return (
    <View className="flex-row items-center gap-8">
      <View className="flex-row items-center gap-2">
        <FontAwesome name="star" size={24} color={COLOR_DARK_BLUE} />
        <FontAwesome name="star" size={24} color={COLOR_DARK_BLUE} />
        <FontAwesome name="star" size={24} color={COLOR_DARK_BLUE} />
        <FontAwesome name="star" size={24} color={COLOR_DARK_BLUE} />
        <FontAwesome name="star" size={24} color={COLOR_DARK_BLUE} />
      </View>
      <Text className="font-bold text-primary-dark">5.0</Text>
    </View>
  );
}

function CustomerReview({ item }: { item: Review }): ReactElement {
  const { name, message } = item;

  return (
    <View className="w-full flex-row justify-between mb-2 p-4 rounded-2xl bg-gray-100">
      <View className="flex-col gap-2">
        <Text className="text-lg">{name}</Text>
        <View className="flex-row items-center">
          <FontAwesome name="star" size={size} color={COLOR_DARK_BLUE} />
          <FontAwesome name="star" size={size} color={COLOR_DARK_BLUE} />
          <FontAwesome name="star" size={size} color={COLOR_DARK_BLUE} />
          <FontAwesome name="star" size={size} color={COLOR_DARK_BLUE} />
          <FontAwesome name="star" size={size} color={COLOR_DARK_BLUE} />
        </View>
        <Text className="text-md text-gray-500">{message}</Text>
      </View>
      <View>
        <Text className="text-lg text-gray-400">3 days ago</Text>
      </View>
    </View>
  );
}

function ReviewTab() {
  return (
    <View className="w-full flex-1 p-4 gap-4">
      <Text className="font-bold text-xl text-gray-600">
        Customer Reviews (212)
      </Text>
      <View className="flex-col px-4 gap-4">
        <View className="w-full flex-row items-center justify-between">
          <Text className="font-bold text-gray-500">Quality</Text>
          <RatingSection />
        </View>
        <View className="w-full flex-row items-center justify-between">
          <Text className="font-bold text-gray-500">Punctuality</Text>
          <RatingSection />
        </View>
        <View className="w-full flex-row items-center justify-between">
          <Text className="font-bold text-gray-500">Friendliness</Text>
          <RatingSection />
        </View>
      </View>
      <FlatList
        data={customerReviews}
        keyExtractor={(item, index) => item.name + index.toString()}
        renderItem={({ item }: { item: Review }) => {
          return <CustomerReview item={item} />;
        }}
      />
    </View>
  );
}

export default ReviewTab;
