import React, { ReactElement } from "react";
import { View } from "react-native";

import ReScheduleScreen from "@src/modules/re-schedule/screen/ReScheduleScreen";

function Schedule(): ReactElement {
  return (
    <View className={`flex-1`}>
      <ReScheduleScreen />
    </View>
  );
}

export default Schedule;
