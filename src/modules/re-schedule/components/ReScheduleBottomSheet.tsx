import React, { ReactElement, RefObject, useMemo } from "react";
import { Text, View, ScrollView } from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
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
  label?: string;
}): ReactElement => (
  <View
    key={date}
    style={{ elevation: 2 }}
    className={`mx-4 mt-2 mb-1 flex-1 flex-row items-center justify-between bg-white rounded-xl ${
      isNew ? "overflow-hidden" : "overflow-x-hidden relative"
    }`}
  >
    {!isNew && (
      <View
        style={{ elevation: 2 }}
        className="absolute top-[-10] left-4 bg-primary-dark px-4 py-1 rounded-md"
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
  const snapPoints = useMemo(() => ["25%", "50%", "75%", "100%"], []);

  // New list items
  const newListItems = useMemo(() => {
    return Object.entries(selectedDates)
      .filter(([_, time]) => time !== null)
      .map(([date, time]) => (
        <RenderListItem
          key={date}
          date={date}
          time={time as string}
          isNew={true}
          color={COLOR_DARK_GREEN}
        />
      ));
  }, [selectedDates]);

  // Old list items
  const oldListItems = useMemo(() => {
    if (booking) {
      return booking.scheduledDates.map(({ date, time }: ScheduledDate) => (
        <RenderListItem
          key={date}
          date={date}
          time={time}
          isNew={false}
          color={COLOR_DARK_BLUE}
        />
      ));
    }
  }, [booking]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <BottomSheetView>
        <ScrollView>
          <View>
            <ScrollView>
              <View className="flex-1 flex-grow flex-col gap-4">
                {newListItems}
                {oldListItems}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
}

export default ReScheduleBottomSheet;
