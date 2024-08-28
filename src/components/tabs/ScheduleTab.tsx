import React, { ReactElement, useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import HeadingChips from "@components/elements/chips/HeadingChips";
import { COLOR_BLUE } from "@src/constants";
import { LinearGradient } from "expo-linear-gradient";

type DaysSelection = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

const initialDays: DaysSelection = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

function ScheduleTab(): ReactElement {
  const [days, setDays] = useState(initialDays);
  const [daysArray, setDaysArray] = useState<
    { day: keyof DaysSelection; selected: boolean }[]
  >([]);

  useEffect(() => {
    const array = Object.entries(days).map(([day, selected]) => ({
      day: day as keyof DaysSelection,
      selected,
    }));
    setDaysArray(array);
  }, [days]);

  const handlePress = (day: keyof DaysSelection) => {
    setDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const RenderItem = ({
    item,
  }: {
    item: { day: keyof DaysSelection; selected: boolean };
  }) => (
    <TouchableOpacity
      style={{ elevation: 2 }}
      className="w-[100] h-[40] overflow-hidden rounded-full mx-[4]"
      onPress={() => handlePress(item.day)}
    >
      <LinearGradient
        colors={[
          item.selected ? "#76A9FA" : "#a2a2a2",
          item.selected ? "#98d3ff" : "#ffffff",
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="w-full h-full flex justify-center items-center"
      >
        <Text>{item.day.toString().toUpperCase()}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 w-full bg-white p-4 gap-4">
      <HeadingChips text="WORKING DAYS" width={120} color={COLOR_BLUE} />
      {/*<FlatList
        data={daysArray}
        renderItem={RenderItem}
        keyExtractor={(item) => item.day}
        horizontal
      />*/}
      <View className="flex-row flex-wrap">
        {daysArray.map((item) => {
          return <RenderItem item={item} />;
        })}
      </View>
    </View>
  );
}

export default ScheduleTab;
