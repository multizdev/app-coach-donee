import React, { ReactElement } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import ActivityCard from "@src/modules/users/components/elements/activities/ActivityCard";
import { Activity } from "@src/types";
import {
  COLOR_AQUA,
  COLOR_BLUE,
  COLOR_YELLOW,
} from "@src/modules/common/constants";

const activities: Activity[] = [
  {
    name: "Hatton Boxing",
    background: COLOR_YELLOW,
    category: "Full Body",
    image: require("@assets/activities/coach_donee_white.png"),
  },
  {
    name: "Diet Consultation",
    background: COLOR_BLUE,
    category: "Nutrition",
    image: require("@assets/activities/coach_donee_blue.png"),
  },
  {
    name: "Weight Training",
    background: COLOR_AQUA,
    category: "Strength",
    image: require("@assets/activities/coach_donee_3.png"),
  },
];

function ActivitiesList(): ReactElement {
  return (
    <FlatList
      data={activities}
      renderItem={({ item, index }: ListRenderItemInfo<Activity>) => (
        <ActivityCard item={item} index={index} />
      )}
    />
  );
}

export default ActivitiesList;
