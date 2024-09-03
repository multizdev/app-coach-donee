import useAppStore from "@src/modules/common/stores/useAppStore";
import { ReactElement } from "react";
import { View, Text } from "react-native";
import TimeSelection from "@src/modules/trainers/components/schedule/TimeSelection";

function SelectedDays(): ReactElement {
  const { daysArray } = useAppStore();
  const selectedDays = daysArray.filter((day) => day.selected);

  return (
    <View className="gap-4">
      {selectedDays.length === 0 ? (
        <Text className="text-[#888] text-center">No days selected</Text>
      ) : (
        selectedDays.map((day) => (
          <View key={day.day} className="flex-row items-center flex-wrap">
            <View className="w-[60]">
              <Text className="font-bold text-primary-dark text-xl">
                {day.day.toUpperCase().slice(0, 3)}
              </Text>
            </View>
            <TimeSelection day={day.day} />
          </View>
        ))
      )}
    </View>
  );
}

export default SelectedDays;
