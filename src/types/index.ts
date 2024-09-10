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

type Day = {
  dayName: string;
  dateNumber: number;
  dateInstance: Date;
};

export type { Activity, DaysSelection, Day };
