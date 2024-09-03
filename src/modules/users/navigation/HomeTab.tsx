import React, { ReactElement } from "react";
import ActivitiesList from "@src/modules/users/components/lists/ActivitiesList";
import { View } from "react-native";

function HomeTab(): ReactElement {
  return (
    <View className="p-4 bg-white">
      <ActivitiesList />
    </View>
  );
}

export default HomeTab;
