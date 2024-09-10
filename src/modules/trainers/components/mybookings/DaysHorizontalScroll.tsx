import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import useBookingsStore from "@src/modules/trainers/store/useBookingsStore";

const DaysHorizontalScroll = () => {
  const { selectedDate, setSelectedDate } = useBookingsStore();
  const scrollViewRef = useRef<ScrollView>(null);

  const daysOfMonth = useMemo(() => {
    const startOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
    );

    let allDays = [];
    for (
      let date = startOfMonth;
      date <= endOfMonth;
      date.setDate(date.getDate() + 1)
    ) {
      allDays.push(new Date(date));
    }

    return allDays.map((date) => ({
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dateNumber: date.getDate(),
      dateInstance: new Date(date),
    }));
  }, [selectedDate]);

  const initialIndex = useMemo(() => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    return daysOfMonth.findIndex(
      (day) => day.dateInstance.toDateString() === startOfWeek.toDateString(),
    );
  }, [selectedDate, daysOfMonth]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: initialIndex * 60,
        animated: false,
      });
    }
  }, [initialIndex]);

  return (
    <View className="flex-row items-center py-2">
      <ScrollView
        ref={scrollViewRef}
        className="w-full h-[80px]"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {daysOfMonth.map(({ dayName, dateNumber, dateInstance }, index) => {
          const isSelected =
            selectedDate.toDateString() === dateInstance.toDateString();
          const textClass = isSelected ? "text-white" : "text-gray-400";

          return (
            <TouchableOpacity
              key={index}
              className="w-[60] h-[80] rounded-3xl overflow-hidden flex-col justify-between items-center"
              onPress={() => setSelectedDate(new Date(dateInstance))}
            >
              <LinearGradient
                colors={
                  isSelected
                    ? ["#76A9FA", "#98d3ff"]
                    : ["rgba(0,0,0,0)", "rgba(0,0,0,0)"]
                }
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className="w-full h-full flex justify-center items-center"
              >
                <Text className={`font-bold text-xl ${textClass}`}>
                  {dayName}
                </Text>
                <Text className={`font-bold ${textClass}`}>{dateNumber}</Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DaysHorizontalScroll;
