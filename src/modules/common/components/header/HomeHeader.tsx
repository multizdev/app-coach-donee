import React, { ReactElement } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";

import { DrawerActions } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import auth from "@react-native-firebase/auth";

import { COLOR_BLUE } from "@src/modules/common/constants";
import useAuth from "@src/modules/auth/hooks/useAuth";

function HomeHeader({
  title,
  search,
  filter,
}: {
  title?: string;
  search?: ReactElement;
  filter?: ReactElement;
}): ReactElement {
  const navigation = useNavigation();
  const { onAuthStateChanged } = useAuth();

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      if (e instanceof Error) Alert.alert("Problem Signing out", e.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-between w-full pr-8 gap-4">
      <View className="flex-row items-center justify-between w-full">
        <View className="flex-1 items-start">
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer);
            }}
          >
            <MaterialIcons name="menu" size={30} color={COLOR_BLUE} />
          </TouchableOpacity>
        </View>
        <View className="flex-2 items-center">
          {title ? (
            <Text className="font-bold text-2xl text-primary">{title}</Text>
          ) : (
            <Image
              source={require("@assets/logo.webp")}
              className="w-[60] h-[40]"
              resizeMode="contain"
            />
          )}
        </View>
        <View className="flex-1 items-end">
          <TouchableOpacity
            className="w-[40] h-[40] flex justify-center items-center rounded-2xl"
            onPress={signOut}
          >
            <MaterialIcons name="exit-to-app" size={30} color={COLOR_BLUE} />
          </TouchableOpacity>
        </View>
      </View>
      {search}
      {filter}
    </View>
  );
}

export default HomeHeader;
