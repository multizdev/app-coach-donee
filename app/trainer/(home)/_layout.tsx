import React, { ReactElement } from "react";

import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Entypo } from "@expo/vector-icons";

import { COLOR_BLUE } from "src/modules/common/constants";

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
            tabBarIcon: () => (
              <AntDesign name="home" size={24} color={COLOR_BLUE} />
            ),
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            tabBarIcon: () => (
              <AntDesign name="calendar" size={24} color={COLOR_BLUE} />
            ),
          }}
        />
        <Tabs.Screen
          name="mybooking"
          options={{
            title: "Bookings",
            tabBarIcon: () => (
              <Entypo name="list" size={24} color={COLOR_BLUE} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </>
  );
}

export default HomeLayout;
