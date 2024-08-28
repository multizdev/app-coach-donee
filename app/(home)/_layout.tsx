import React, { ReactElement } from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { COLOR_BLUE } from "@src/constants";

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
          name="test1"
          options={{
            title: "My Profile",
            tabBarIcon: () => (
              <AntDesign name="home" size={24} color={COLOR_BLUE} />
            ),
          }}
        />
        <Tabs.Screen
          name="test2"
          options={{
            title: "Bookings",
            tabBarIcon: () => (
              <AntDesign name="home" size={24} color={COLOR_BLUE} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </>
  );
}

export default HomeLayout;
