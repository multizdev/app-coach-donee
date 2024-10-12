import { create, StoreApi, UseBoundStore } from "zustand";

import { TimeSpan } from "@src/types";

import { Booking } from "@server/database/models/Booking";
import Trainer from "@server/database/models/Trainer";

type State = {
  bookingId: string | null;
  booking: Booking | null;
  trainer: Trainer | null;
  preSelectedDates: { [key: string]: string | null };
  selectedDate: string | null;
  selectedDates: { [key: string]: string | null };
  selectedTime: string | null;
  selectedDay: string | null;
  timeSpan: TimeSpan | null;
  loading: boolean;
};

type Actions = {
  setBookingId: (bookingId: string | null) => void;
  setBooking: (booking: Booking | null) => void;
  setTrainer: (trainer: Trainer | null) => void;
  setLoading: (loading: boolean) => void;
  addSelectedDate: (date: string, time: string | null) => void;
  setSelectedDate: (selectedDate: string | null) => void;
  setSelectedTime: (selectedTime: string | null) => void;
  setSelectedDay: (selectedDay: string | null) => void;
  setTimeSpan: (timeSpan: TimeSpan | null) => void;
  resetSelectedDates: () => void;
};

const defaultState: State = {
  bookingId: null,
  booking: null,
  trainer: null,
  loading: false,
  selectedDate: null,
  selectedDates: {},
  preSelectedDates: {},
  selectedTime: null,
  selectedDay: null,
  timeSpan: null,
};

const useRescheduleStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setLoading: (loading: boolean) => set(() => ({ loading })),
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
    resetSelectedDates: () => set(() => ({ selectedDates: {} })),
    setSelectedDay: (selectedDay: string | null) =>
      set(() => ({ selectedDay })),
    setTimeSpan: (timeSpan: TimeSpan | null) => set(() => ({ timeSpan })),
    setBookingId: (bookingId: string | null) => set(() => ({ bookingId })),
    setBooking: (booking: Booking | null) => set(() => ({ booking })),
    setTrainer: (trainer: Trainer | null) => set(() => ({ trainer })),
  }),
);

export default useRescheduleStore;
