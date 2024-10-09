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

export type { DaysSelection, Day };
