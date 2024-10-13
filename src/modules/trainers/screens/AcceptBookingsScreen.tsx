import React, { ReactElement } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import {
  COLOR_DARK_BLUE,
  COLOR_LIGHT_BLUE,
} from "@src/modules/common/constants";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useAcceptBookings from "@src/modules/trainers/hooks/booking/useAcceptBookings";

function AcceptBookingsScreen(): ReactElement {
  const statusBarHeight = Constants.statusBarHeight;

  const { currentBooking, confirmSession, rejectSession, skipSession } =
    useAcceptBookings();

  const { user, serviceName, date } = currentBooking;

  return (
    <ImageBackground
      source={require("@assets/background/coach.webp")}
      className="flex-1 justify-between"
      style={{ paddingTop: statusBarHeight }}
      imageStyle={{ resizeMode: "cover" }}
    >
      <LinearGradient
        colors={[COLOR_LIGHT_BLUE, "rgba(255,255,255,0)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="flex-1 justify-end"
      >
        <View className="p-4 gap-4">
          <View className="flex-col items-end">
            <Text className="text-white text-4xl font-bold">YOU HAVE A</Text>
            <View
              style={{ elevation: 4 }}
              className="w-full bg-white flex-row justify-end rounded-xl p-2"
            >
              <Text className="text-4xl font-bold text-primary-dark">
                NEW BOOKING
              </Text>
            </View>
            <Text className="text-white text-4xl font-bold">
              WITH {user?.displayName || user?.fullName}
            </Text>
            <View className="w-full flex-row justify-start items-center gap-2">
              <Text className="text-white text-xl font-bold">For</Text>
              <Text className="px-4 py-1 bg-white font-bold text-md text-primary-dark rounded-xl">
                {serviceName}
              </Text>
            </View>
          </View>
          <View className="flex-col gap-2">
            <View className="flex-row items-center gap-2">
              <AntDesign name="clockcircleo" size={24} color="white" />
              <Text className="text-white font-bold text-xl">
                {new Date(date).toDateString()}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="location-outline" size={24} color="white" />
              <Text className="text-white font-bold text-xl">
                User's address will appear here
              </Text>
            </View>
          </View>
          <PrimaryButton
            text="Confirm"
            backgroundColor={[COLOR_DARK_BLUE, COLOR_DARK_BLUE]}
            icon={<FontAwesome5 name="check-circle" size={24} color="white" />}
            onPress={confirmSession}
          />
          <PrimaryButton
            text="Reject"
            textColor="text-primary-dark"
            primary={false}
            icon={
              <AntDesign
                name="closecircleo"
                size={24}
                color={COLOR_DARK_BLUE}
              />
            }
            onPress={rejectSession}
          />
          <TouchableOpacity
            className="flex-row justify-center items-center"
            onPress={skipSession}
          >
            <Text className="text-xl text-white font-bold">Skip</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

export default AcceptBookingsScreen;
