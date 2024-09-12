import React, { ReactElement } from "react";

import { View } from "react-native";

import ActivitiesList from "@src/modules/users/components/lists/ActivitiesList";

function HomeTab(): ReactElement {
  return (
    <View className="flex-1 bg-white">
      <ActivitiesList />
    </View>
  );
}

export default HomeTab;
