import React, { ReactElement, RefObject, useMemo } from "react";
import { Text, View, ScrollView } from "react-native";

import { Fontisto, Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import useBookingStore from "@src/modules/users/stores/home/useBookingStore";
import { COLOR_DARK_GREEN } from "@src/modules/common/constants";

// Function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  return date.toLocaleDateString("en-US", options);
};

function ScheduleBottomSheet({
  bottomSheetRef,
}: {
  bottomSheetRef: RefObject<BottomSheetMethods>;
}): ReactElement {
  // Get selected dates from store
  const { selectedDates } = useBookingStore();

  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // Render the list using .map
  const renderListItems = useMemo(() => {
    return Object.entries(selectedDates)
      .filter(([_, time]) => time !== null) // Filter out items where time is null
      .map(([date, time]) => (
        <View
          key={date}
          style={{ elevation: 2 }}
          className="flex-1 flex-row items-center justify-between bg-white rounded-xl overflow-hidden"
        >
          <View className="w-2 h-full bg-my-green-dark" />
          <View className="flex-grow flex-row items-center justify-between p-6">
            <View className="flex-row items-center gap-4">
              <Fontisto name="date" size={24} color={COLOR_DARK_GREEN} />
              <Text className="text-xl text-gray-800">{formatDate(date)}</Text>
            </View>
            <View className="flex-row gap-4 items-center">
              <Ionicons
                name="time-outline"
                size={24}
                color={COLOR_DARK_GREEN}
              />
              <Text className="text-xl">{time}</Text>
            </View>
          </View>
        </View>
      ));
  }, [selectedDates]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <BottomSheetView>
        <ScrollView>
          <View className="m-4 gap-4">{renderListItems}</View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
}

export default ScheduleBottomSheet;
