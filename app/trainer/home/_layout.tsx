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
  FontAwesome,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { COLOR_BLUE, COLOR_DARK_BLUE } from "@src/modules/common/constants";
import useAppStore from "@src/modules/common/stores/useAppStore";
import ProfileImage from "@src/modules/common/components/user/ProfileImage";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { detailedTrainer } = useAppStore();

  if (detailedTrainer) {
    const { fullName, access, rating, session } = detailedTrainer;

    return (
      <DrawerContentScrollView {...props}>
        {/* Profile Section */}
        <View className="m-5 py-4 border-0 border-b border-b-gray-100">
          <ProfileImage />
          <Text className="text-lg font-bold mb-1.25">{fullName}</Text>
          <View className="flex-row items-center gap-2">
            <Octicons
              name="dot-fill"
              size={18}
              color={access ? "green" : "red"}
            />
            <Text className="text-md font-bold text-gray-600">
              {access ? "Active" : "Inactive"}
            </Text>
            <FontAwesome name="star" size={16} color={COLOR_DARK_BLUE} />
            <Text className="text-md text-gray-600">
              {rating ? rating : 0.0} ({session ? session : 0})
            </Text>
          </View>
        </View>

        {/* Drawer Navigation Items */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }
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
