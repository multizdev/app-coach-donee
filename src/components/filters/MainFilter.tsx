import React, { ReactElement } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  COLOR_AQUA,
  COLOR_BLUE,
  COLOR_PINK,
  COLOR_YELLOW,
} from "@src/constants";

type FilterOption = {
  name: string;
  color: string;
};

const filterOptions: FilterOption[] = [
  { name: "All", color: COLOR_BLUE },
  { name: "Full Body", color: COLOR_YELLOW },
  { name: "Upper", color: COLOR_PINK },
  { name: "Lower", color: COLOR_AQUA },
];

function MainFilter(): ReactElement {
  return (
    <FlatList
      horizontal={true}
      data={filterOptions}
      renderItem={({ item }: ListRenderItemInfo<FilterOption>) => {
        return (
          <TouchableOpacity
            style={{ elevation: 2 }}
            className="w-[100] h-[40] overflow-hidden rounded-full mx-2"
          >
            <LinearGradient
              colors={["#76A9FA", "#98d3ff"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              className="w-full h-full flex justify-center items-center"
            >
              <Text className="text-white">{item.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.name}
    />
  );
}

export default MainFilter;
