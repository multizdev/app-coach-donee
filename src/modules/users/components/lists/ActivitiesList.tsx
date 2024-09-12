import React, { ReactElement } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import ActivityCard from "@src/modules/users/components/elements/activities/ActivityCard";
import { Activity } from "@src/types";
import { ACTIVITIES } from "@src/modules/users/components/lists/activities";

function ActivitiesList(): ReactElement {
  return (
    <FlatList
      contentContainerClassName="p-4"
      data={ACTIVITIES}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }: ListRenderItemInfo<Activity>) => (
        <ActivityCard item={item} index={index} />
      )}
    />
  );
}

export default ActivitiesList;
