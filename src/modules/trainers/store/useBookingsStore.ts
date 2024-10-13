import { create, StoreApi, UseBoundStore } from "zustand";

import { Booking } from "@server/database/models/Booking";

type State = {
  allBookings: Booking[];
  selectedDate: Date;
};

type Actions = {
  setAllBookings: (bookings: Booking[]) => void;
  setSelectedDate: (selectedDate: Date) => void;
};

const defaultState: State = {
  allBookings: [],
  selectedDate: new Date(),
};

const useBookingsStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setAllBookings: (bookings: Booking[]) =>
      set(() => ({ allBookings: [...bookings] })),
    setSelectedDate: (selectedDate: Date) => set(() => ({ selectedDate })),
  }),
);

export default useBookingsStore;
