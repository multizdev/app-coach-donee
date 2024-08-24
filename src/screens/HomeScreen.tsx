import React, { ReactElement } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from "react-native";
import { Icon } from "@ant-design/react-native";
import ActivitiesList from "@components/lists/ActivitiesList";
import {
  COLOR_AQUA,
  COLOR_BLUE,
  COLOR_DARK_GREEN,
  COLOR_LIGHT_GREEN,
  COLOR_PINK,
  COLOR_PURPLE,
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

function HomeScreen(): ReactElement {
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <View
      style={{
        paddingTop: statusBarHeight,
        backgroundColor: "#242424",
        gap: 40,
      }}
      className="flex-1 w-full justify-center items-center p-6"
    >
      <View className="w-full h-[100] flex flex-row items-center gap-6">
        <TouchableOpacity
          style={{
            width: 80,
            borderRadius: 30,
            borderWidth: 3,
            borderStyle: "solid",
            borderColor: "#3c3c3c",
            backgroundColor: "#242424",
          }}
          className="h-full bg-black rounded-3xl border-2 border-amber-50 flex justify-center items-center"
        >
          <Icon name="arrow-left" color="white" />
        </TouchableOpacity>
        <View className="flex-1 flex-col">
          <Text style={{ fontSize: 30 }} className="text-white">
            Top Guru's For
          </Text>
          <Text style={{ fontSize: 30 }} className="text-white font-bold">
            Yoga Exercise
          </Text>
        </View>
      </View>
      <View className="flex-1 w-full h-full">
        <FlatList
          horizontal={true}
          data={filterOptions}
          renderItem={({ item }: ListRenderItemInfo<FilterOption>) => {
            return (
              <TouchableOpacity
                style={[
                  styles.filterContainer,
                  { backgroundColor: item.color },
                ]}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
        <ActivitiesList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    width: 90,
    height: 55,
    padding: 10,
    marginBottom: 60,
    marginRight: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
