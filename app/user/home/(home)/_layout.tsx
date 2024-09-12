import React, { ReactElement } from "react";

import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";

import { COLOR_BLUE } from "src/modules/common/constants";

const ICON_SIZE = 24;

function HomeLayout(): ReactElement {
  return (
    <>
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
        <Tabs.Screen
          name="booking"
          options={{
            title: "Bookings",
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
      </Tabs>
    </>
  );
}

export default HomeLayout;
