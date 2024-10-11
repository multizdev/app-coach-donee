import React, { ReactElement, RefObject, useCallback, useMemo } from "react";
import { Text, View, ScrollView } from "react-native";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import useBookingStore from "@src/modules/users/stores/home/useBookingStore";

function ScheduleBottomSheet({
  bottomSheetRef,
}: {
  bottomSheetRef: RefObject<BottomSheetMethods>;
}): ReactElement {
  // Get selected dates from store
  const { selectedDates } = useBookingStore();

  // Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
          <View className="flex-grow flex-row justify-between p-6">
            <View className="flex-row gap-2 items-center">
              <Text className="text-xl font-bold text-my-green-dark">
                Date:
              </Text>
              <Text className="text-xl text-gray-600">{date}</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Text className="text-xl font-bold text-my-green-dark">
                Time:
              </Text>
              <Text className="text-xl text-gray-600">{time}</Text>
            </View>
          </View>
        </View>
      ));
  }, [selectedDates]);

  console.log("Selected Dates:", Object.entries(selectedDates)); // Logging the selected dates to debug

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "rgb(250,250,250)" }}
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
