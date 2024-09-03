import React, { ReactElement } from "react";
import { View, StatusBar } from "react-native";
import ScheduleScreen from "@src/modules/users/screens/ScheduleScreen";

function Schedule(): ReactElement {
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <View style={{ paddingTop: statusBarHeight }} className={`flex-1`}>
      <ScheduleScreen />
    </View>
  );
}

export default Schedule;
