import React, { ReactElement } from "react";
import { View } from "react-native";
import ScheduleScreen from "@src/modules/users/screens/ScheduleScreen";

function Schedule(): ReactElement {
  return (
    <View className={`flex-1`}>
      <ScheduleScreen />
    </View>
  );
}

export default Schedule;
