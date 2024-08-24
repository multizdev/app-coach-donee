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
import ActivitiesList from "@components/lists/ActivitiesList";
import {
  COLOR_AQUA,
  COLOR_BLUE,
  COLOR_PINK,
  COLOR_YELLOW,
} from "@src/constants";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "@components/elements/headers/CustomHeader";

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

  const { replace } = useRouter();

  // colors={["#60A5FA", "#98d3ff"]

  return (
    <LinearGradient
      colors={["#242424", "#98d3ff"] /* Corresponds to blue-400 and blue-100 */}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={{
        paddingTop: statusBarHeight,
        gap: 40,
      }}
      className="flex-1 w-full justify-center items-center p-6"
    >
      <CustomHeader
        textFirst="Top Guru's For"
        textBottom="Yoga Exercise"
        action={() => replace("/")}
      />
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
    </LinearGradient>
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
