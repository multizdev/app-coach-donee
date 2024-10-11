import { create, StoreApi, UseBoundStore } from "zustand";

import Trainer from "@server/database/models/Trainer";

import { Package } from "@server/database/models/Package";
import moment from "moment";
import { DaysTime, TimeSpan } from "@src/types";

const getFormattedDate = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const INITIAL_DATE = getFormattedDate(new Date());
const INITIAL_DAY = moment().format("dddd").toLowerCase() as keyof DaysTime;

type State = {
  allTrainers: Trainer[];
  serviceId: string | null;
  serviceName: string | null;
  trainerId: string | null;
  loading: boolean;
  selectedPackage: Package | null;
  selectedDate: string | null;
  selectedDates: { [key: string]: string | null };
  selectedTime: string | null;
  selectedDay: string | null;
  timeSpan: TimeSpan | null;
};

type Actions = {
  setServiceId: (serviceId: string) => void;
  setServiceName: (serviceName: string) => void;
  setTrainerId: (trainerId: string) => void;
  setAllTrainers: (allTrainers: Trainer[]) => void;
  setLoading: (loading: boolean) => void;
  setPackage: (pkg: Package) => void;
  addSelectedDate: (date: string, time: string | null) => void;
  setSelectedDate: (selectedDate: string | null) => void;
  setSelectedTime: (selectedTime: string | null) => void;
  setSelectedDay: (selectedDay: string | null) => void;
  setTimeSpan: (timeSpan: TimeSpan | null) => void;
  resetBookingState: () => void;
};

const defaultState: State = {
  serviceId: null,
  serviceName: null,
  trainerId: null,
  allTrainers: [],
  loading: false,
  selectedPackage: null,
  selectedDate: INITIAL_DATE,
  selectedDates: {},
  selectedTime: null,
  selectedDay: INITIAL_DAY,
  timeSpan: null,
};

const useBookingStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setServiceId: (serviceId: string) => set(() => ({ serviceId })),
    setServiceName: (serviceName: string) => set(() => ({ serviceName })),
    setTrainerId: (trainerId: string) => set(() => ({ trainerId })),
    setAllTrainers: (allTrainers: Trainer[]) =>
      set(() => ({ allTrainers: [...allTrainers] })),
    setLoading: (loading: boolean) => set(() => ({ loading })),
    setPackage: (pkg: Package) => set(() => ({ selectedPackage: pkg })),
    setSelectedDate: (selectedDate: string | null) =>
      set(() => ({ selectedDate })),
    addSelectedDate: (date: string, time: string | null) =>
      set((state) => ({
        selectedDates: { ...state.selectedDates, [date]: time },
      })),
    setSelectedTime: (selectedTime: string | null) =>
      set((state) => {
        const selectedDates = {
          ...state.selectedDates,
          [state.selectedDate!]: selectedTime,
        };

        return {
          selectedTime,
          selectedDates,
        };
      }),
    setSelectedDay: (selectedDay: string | null) =>
      set(() => ({ selectedDay })),
    setTimeSpan: (timeSpan: TimeSpan | null) => set(() => ({ timeSpan })),
    resetBookingState: () => set(() => ({ ...defaultState })),
  }),
);

export default useBookingStore;
