import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Drawer } from "expo-router/drawer";

import useAppStore from "@src/modules/common/stores/useAppStore";
import ProfileImage from "@src/modules/common/components/user/ProfileImage";
import {
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { COLOR_BLUE } from "@src/modules/common/constants";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { detailedUser } = useAppStore();

  if (detailedUser) {
    const { fullName } = detailedUser;

    return (
      <DrawerContentScrollView {...props}>
        {/* Profile Section */}
        <View className="m-5 py-4 border-0 border-b border-b-gray-100">
          <ProfileImage />
          <Text className="text-lg font-bold mb-1.25">{fullName}</Text>
          <View className="flex-row items-center gap-2">
            <Octicons name="dot-fill" size={18} color={"green"} />
            <Text className="text-sm text-gray-500">Active</Text>
          </View>
          {/*<View className="flex-row items-center gap-2">
            <Octicons
              name="dot-fill"
              size={18}
              color={access ? "green" : "red"}
            />
            <Text className="text-md font-bold text-gray-600">
              {access ? "Active" : "Inactive"}
            </Text>
            <FontAwesome name="star" size={16} color={COLOR_DARK_BLUE} />
            <Text className="text-md text-gray-600">4.99 (212)</Text>
          </View>*/}
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
        screenOptions={{ headerShown: false }}
        drawerContent={(props: DrawerContentComponentProps) => (
          <CustomDrawerContent {...props} />
        )}
      >
        <Drawer.Screen
          name="(home)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "home",
            drawerLabelStyle: { color: COLOR_BLUE },
            drawerIcon: () => (
              <AntDesign name="home" size={24} color={COLOR_BLUE} />
            ),
          }}
        />
        <Drawer.Screen
          name="userDetails" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Personal Details",
            title: "userDetails",
            drawerLabelStyle: { color: COLOR_BLUE },
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="account-details"
                size={24}
                color={COLOR_BLUE}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default UserLayout;
