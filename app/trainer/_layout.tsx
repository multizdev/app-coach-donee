import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Drawer } from "expo-router/drawer";
import {
  AntDesign,
  FontAwesome,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Avatar } from "react-native-paper";
import { COLOR_BLUE, COLOR_DARK_BLUE } from "@src/modules/common/constants";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Profile Section */}
      <View className="m-5 py-4 border-0 border-b border-b-gray-100">
        <Avatar.Image
          size={80}
          source={require("@assets/activities/gym.webp")}
        />
        <Text className="text-lg font-bold mb-1.25">John Doe</Text>
        <Text className="text-sm text-gray-500">Pro Member</Text>
        <View className="flex-row items-center gap-2">
          <Octicons name="dot-fill" size={18} color="green" />
          <Text className="text-md font-bold text-gray-600">Active</Text>
          <FontAwesome name="star" size={16} color={COLOR_DARK_BLUE} />
          <Text className="text-md text-gray-600">4.99 (212)</Text>
        </View>
      </View>

      {/* Drawer Navigation Items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function UserLayout(): ReactElement {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(props: DrawerContentComponentProps) => (
          <CustomDrawerContent {...props} />
        )}
      >
        <Drawer.Screen
          name="(home)" // This is the name of the page and must match the url from root
          options={{
            drawerActiveTintColor: COLOR_BLUE,
            drawerIcon: (props) => <FontAwesome name="home" {...props} />,
            drawerLabel: "Home",
            title: "home",
          }}
        />
        <Drawer.Screen
          name="editAvailability" // This is the name of the page and must match the url from root
          options={{
            drawerActiveTintColor: COLOR_BLUE,
            drawerIcon: (props) => (
              <MaterialCommunityIcons name="calendar-edit" {...props} />
            ),
            drawerLabel: "Edit Availability",
            title: "editAvailability",
          }}
        />
        <Drawer.Screen
          name="experienceDetails" // This is the name of the page and must match the url from root
          options={{
            drawerActiveTintColor: COLOR_BLUE,
            drawerIcon: (props) => (
              <MaterialCommunityIcons
                name="card-account-details-star"
                {...props}
              />
            ),
            drawerLabel: "Experience Details",
            title: "experienceDetails",
          }}
        />
        <Drawer.Screen
          name="userDetails" // This is the name of the page and must match the url from root
          options={{
            drawerActiveTintColor: COLOR_BLUE,
            drawerIcon: (props) => (
              <MaterialCommunityIcons name="account-details" {...props} />
            ),
            drawerLabel: "Personal Details",
            title: "userDetails",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default UserLayout;
