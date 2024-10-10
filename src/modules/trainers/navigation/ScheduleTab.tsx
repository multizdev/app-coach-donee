import React, { ReactElement } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import HeadingChips from "@src/modules/users/components/elements/chips/HeadingChips";
import { COLOR_BLUE } from "@src/modules/common/constants";
import { LinearGradient } from "expo-linear-gradient";
import useAppStore from "@src/modules/common/stores/useAppStore";
import SelectedDays from "@src/modules/trainers/components/schedule/SelectedDays";
import AwayMode from "@src/modules/trainers/components/schedule/AwayMode";
import firestore from "@react-native-firebase/firestore";
import { DaysArray, DaysSelection, DaysTime } from "@src/types";

function RenderItem({
  item,
}: {
  item: { day: keyof DaysSelection; selected: boolean };
}): ReactElement {
  const { toggleDay } = useAppStore();

  return (
    <TouchableOpacity
      style={{ elevation: 4 }}
      className="w-[60] h-[60] overflow-hidden rounded-full"
      onPress={() => toggleDay(item.day)}
    >
      <LinearGradient
        colors={[
          item.selected ? "#76A9FA" : "#ffffff",
          item.selected ? "#98d3ff" : "#ffffff",
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="w-full h-full flex justify-center items-center"
      >
        <Text className={`${item.selected ? "text-white" : "text-black"}`}>
          {item.day.toString().toUpperCase().slice(0, 3)}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function ScheduleTab(): ReactElement {
  const { user, daysArray, daysTimes } = useAppStore();

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="flex-1 w-full bg-white p-4 gap-6">
          <HeadingChips text="WORKING DAYS" width={120} color={COLOR_BLUE} />
          <View className="flex-row flex-wrap gap-4">
            {daysArray.map((item) => {
              return <RenderItem key={item.day} item={item} />;
            })}
          </View>
          <HeadingChips text="WORKING HOURS" width={120} color={COLOR_BLUE} />
          <SelectedDays />
          <AwayMode />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{ elevation: 2 }}
        className="h-[50] rounded-full overflow-hidden mx-4 mb-4"
        onPress={async () => {
          const selectedDays = daysArray.filter((day) => day.selected);

          const finalDayTimes: DaysTime = Object.fromEntries(
            selectedDays.map(({ day }: DaysArray) => [day, daysTimes[day]]),
          ) as DaysTime;

          await firestore().collection("Trainers").doc(user?.uid).update({
            schedule: finalDayTimes,
          });
        }}
      >
        <LinearGradient
          colors={
            ["#60A5FA", "#98d3ff"] /* Corresponds to blue-400 and blue-100 */
          }
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="w-full h-full flex justify-center items-center"
        >
          <Text className="text-white text-center font-semibold">
            Save Changes
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default ScheduleTab;
