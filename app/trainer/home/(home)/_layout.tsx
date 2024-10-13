import React, { ReactElement, useEffect } from "react";
import { View } from "react-native";

import { Tabs, useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { COLOR_BLUE } from "src/modules/common/constants";
import useAllBookings from "@src/modules/trainers/hooks/booking/useAllBookings";
import useHomeStore from "@src/modules/trainers/store/useHomeStore";

const ICON_SIZE = 24;

function HomeLayout(): ReactElement {
  const { replace } = useRouter();
  const { bookingsList } = useAllBookings();

  const { setPendingBookings } = useHomeStore();

  useEffect(() => {
    if (bookingsList.length > 0) {
      const filteredBookings = bookingsList.filter(
        (booking) => !booking.status,
      );

      if (filteredBookings.length > 0) {
        setPendingBookings(filteredBookings);
        replace("/trainer/screens/acceptBookings");
      }
    }
  }, [bookingsList]);

  return (
    <View className="flex-1 bg-white">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLOR_BLUE,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="home" size={ICON_SIZE} color={COLOR_BLUE} />
              ) : (
                <Ionicons
                  name="home-outline"
                  size={ICON_SIZE}
                  color={COLOR_BLUE}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  name="calendar-sharp"
                  size={ICON_SIZE}
                  color={COLOR_BLUE}
                />
              ) : (
                <Ionicons
                  name="calendar-outline"
                  size={ICON_SIZE}
                  color={COLOR_BLUE}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="clients"
          options={{
            title: "Clients",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="account-group"
                  size={ICON_SIZE}
                  color={COLOR_BLUE}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={ICON_SIZE}
                  color={COLOR_BLUE}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chats",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  name="chatbox-ellipses"
                  size={ICON_SIZE}
                  color={COLOR_BLUE}
                />
              ) : (
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={ICON_SIZE}
                  color={COLOR_BLUE}
                />
              ),
          }}
        />
      </Tabs>
    </View>
  );
}

export default HomeLayout;
