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

type DaysArray = { day: keyof DaysSelection; selected: boolean };

export type { DaysSelection, Day, DaysTime, DaysArray };
