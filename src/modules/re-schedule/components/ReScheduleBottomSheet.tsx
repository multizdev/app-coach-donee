import React, { ReactElement, RefObject, useMemo, useCallback } from "react";
import { View, Text } from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import {
  COLOR_DARK_BLUE,
  COLOR_DARK_GREEN,
} from "@src/modules/common/constants";
import useRescheduleStore from "@src/modules/re-schedule/store/useRescheduleStore";
import { ScheduledDate } from "@server/database/models/Booking";

// Function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  return date.toLocaleDateString("en-US", options);
};

// Component to render each list item
const RenderListItem = ({
  date,
  time,
  isNew,
  color,
}: {
  date: string;
  time: string;
  isNew: boolean;
  color: string;
}): ReactElement => (
  <View
    key={date}
    style={{ elevation: 2 }}
    className={`flex-1 flex-row items-center justify-between bg-white rounded-xl ${
      isNew ? "overflow-hidden" : "overflow-x-hidden relative"
    }`}
  >
    {!isNew && (
      <View
        style={{ elevation: 2 }}
        className="absolute top-[-10] left-4 bg-primary-dark px-2 py-1 rounded-xl"
      >
        <Text className="text-white">Pre-Scheduled</Text>
      </View>
    )}
    <View
      className={`w-2 h-full ${isNew ? `bg-my-green-dark` : "rounded-l-full bg-primary-dark"}`}
    />
    <View className="flex-grow flex-row items-center justify-between p-6">
      <View className="flex-row items-center gap-4">
        <Fontisto name="date" size={24} color={color} />
        <Text className="text-xl text-gray-800">{formatDate(date)}</Text>
      </View>
      <View className="flex-row gap-4 items-center">
        <Ionicons name="time-outline" size={24} color={color} />
        <Text className="text-xl">{time}</Text>
      </View>
    </View>
  </View>
);

function ReScheduleBottomSheet({
  bottomSheetRef,
}: {
  bottomSheetRef: RefObject<BottomSheetMethods>;
}): ReactElement {
  const { selectedDates, booking } = useRescheduleStore();
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // Merge new and old list items into one array
  const listItems = useMemo(() => {
    const newItems = Object.entries(selectedDates)
      .filter(([_, time]) => time !== null)
      .map(([date, time]) => ({
        date,
        time: time as string,
        isNew: true,
        color: COLOR_DARK_GREEN,
      }));

    const oldItems =
      booking?.scheduledDates.map(({ date, time }: ScheduledDate) => ({
        date,
        time,
        isNew: false,
        color: COLOR_DARK_BLUE,
      })) || [];

    return [...newItems, ...oldItems];
  }, [selectedDates, booking]);

  // Render each item in the list
  const renderItem = useCallback(
    ({
      item,
    }: {
      item: { date: string; time: string; isNew: boolean; color: string };
    }) => (
      <RenderListItem
        key={item.date}
        date={item.date}
        time={item.time}
        isNew={item.isNew}
        color={item.color}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <BottomSheetFlatList
        data={listItems}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, gap: 16 }}
      />
    </BottomSheet>
  );
}

export default ReScheduleBottomSheet;
