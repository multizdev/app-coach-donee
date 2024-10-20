import { create, StoreApi, UseBoundStore } from "zustand";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { DaysArray, DaysSelection, DaysTime } from "@src/types";
import User from "@server/database/models/User";
import Trainer from "@server/database/models/Trainer";
import { Timestamp } from "@react-native-firebase/firestore";

const initialDays: DaysSelection = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

const initialTimes: DaysTime = {
  monday: { startTime: new Date(), endTime: new Date() },
  tuesday: { startTime: new Date(), endTime: new Date() },
  wednesday: { startTime: new Date(), endTime: new Date() },
  thursday: { startTime: new Date(), endTime: new Date() },
  friday: { startTime: new Date(), endTime: new Date() },
  saturday: { startTime: new Date(), endTime: new Date() },
  sunday: { startTime: new Date(), endTime: new Date() },
};

type State = {
  authState: string;
  days: DaysSelection;
  daysTimes: DaysTime;
  daysArray: DaysArray[];
  accountType: string | null;
  user: FirebaseAuthTypes.User | null;
  detailedUser: User | null;
  detailedTrainer: Trainer | null;
};

type Actions = {
  setAuthState: (authState: string) => void;
  setDays: (days: DaysSelection) => void;
  setDaysArray: () => void;
  toggleDay: (day: keyof DaysSelection) => void;
  setDayTime: (
    day: keyof DaysSelection,
    startTime: Date,
    endTime: Date,
  ) => void;
  setAccountType: (accountType: string | null) => void;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setDetailedUser: (detailedUser: User | null) => void;
  setDetailedTrainer: (detailedTrainer: Trainer | null) => void;
  setSchedule: (schedule: DaysTime) => void;
};

const defaultState: State = {
  authState: "login",
  days: initialDays,
  daysTimes: initialTimes,
  daysArray: Object.entries(initialDays).map(([day, selected]) => ({
    day: day as keyof DaysSelection,
    selected,
  })),
  accountType: null,
  user: null,
  detailedUser: null,
  detailedTrainer: null,
};

const useAppStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setAuthState: (authState: string) => set(() => ({ authState })),
    setDays: (days: DaysSelection) => set(() => ({ days })),
    setDaysArray: () =>
      set((state) => {
        const daysArray: any = Object.entries(state.days).map(
          ([day, selected]) => ({
            day: day as keyof DaysSelection,
            selected,
          }),
        );
        return { daysArray };
      }),
    toggleDay: (day: keyof DaysSelection) =>
      set((state) => {
        const newDays = {
          ...state.days,
          [day]: !state.days[day],
        };
        const daysArray: any = Object.entries(newDays).map(
          ([day, selected]) => ({
            day: day as keyof DaysSelection,
            selected,
          }),
        );
        return { days: newDays, daysArray };
      }),
    setDayTime: (day: keyof DaysSelection, startTime: Date, endTime: Date) =>
      set((state) => ({
        daysTimes: { ...state.daysTimes, [day]: { startTime, endTime } },
      })),
    setAccountType: (accountType: string | null) =>
      set(() => ({ accountType })),
    setUser: (user: FirebaseAuthTypes.User | null) => set(() => ({ user })),
    setDetailedUser: (detailedUser: User | null) =>
      set(() => ({ detailedUser })),
    setDetailedTrainer: (detailedTrainer: Trainer | null) =>
      set(() => ({ detailedTrainer })),
    setSchedule: (schedule: DaysTime) =>
      set((state) => {
        const updatedDays = { ...initialDays };
        const updatedTimes = { ...state.daysTimes };

        Object.entries(schedule).forEach(([day, { startTime, endTime }]) => {
          const times = {
            startTime: (startTime as unknown as Timestamp).toDate(),
            endTime: (endTime as unknown as Timestamp).toDate(),
          };

          updatedDays[day as keyof DaysSelection] = true;
          updatedTimes[day as keyof DaysSelection] = times;
        });

        const daysArray: any = Object.entries(updatedDays).map(
          ([day, selected]) => ({
            day: day as keyof DaysSelection,
            selected,
          }),
        );

        return {
          days: updatedDays,
          daysTimes: updatedTimes,
          daysArray,
        };
      }),
  }),
);

export default useAppStore;
