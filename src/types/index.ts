import { ImageSourcePropType } from "react-native";

type Activity = {
  name: string;
  background: string;
  image: ImageSourcePropType | undefined;
  category: string;
};

type DaysSelection = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

export type { Activity, DaysSelection };
