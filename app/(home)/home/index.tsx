import React, { ReactElement } from "react";

import ActivitiesList from "@components/lists/ActivitiesList";
import { View } from "react-native";

function HomeTabLayout(): ReactElement {
  return (
    <View className="p-4 bg-white">
      <ActivitiesList />
    </View>
  );
}

export default HomeTabLayout;
