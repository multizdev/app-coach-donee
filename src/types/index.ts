import { Timestamp } from "@react-native-firebase/firestore";

type DaysSelection = {
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
};

type Day = {
  dayName: string;
  dateNumber: number;
  dateInstance: Date;
};

type DaysTime = Record<keyof DaysSelection, { startTime: Date; endTime: Date }>;

type DaysTimeTimestamp = Record<
  keyof DaysSelection,
  { startTime: Timestamp; endTime: Timestamp }
>;

type DaysArray = { day: keyof DaysSelection; selected: boolean };

export type { DaysSelection, DaysTimeTimestamp, Day, DaysTime, DaysArray };
