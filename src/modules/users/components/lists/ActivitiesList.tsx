import React, { ReactElement } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import {
  COLOR_AQUA,
  COLOR_BLUE,
  COLOR_YELLOW,
} from "@src/modules/common/constants";
import ActivityCard from "@src/modules/users/components/elements/activities/ActivityCard";
import useActivities from "@src/modules/common/hooks/useActivities";
import { Activity } from "@server/database/models/Activity";

function ActivitiesList(): ReactElement {
  const { services } = useActivities();

  const getColorByIndex = (index: number) => {
    const colors = [COLOR_YELLOW, COLOR_BLUE, COLOR_AQUA];
    return colors[index % colors.length];
  };

  return (
    <FlatList
      contentContainerClassName="p-4"
      data={services}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }: ListRenderItemInfo<Activity>) => (
        <ActivityCard
          item={item}
          index={index}
          color={getColorByIndex(index)}
        />
      )}
    />
  );
}

export default ActivitiesList;
