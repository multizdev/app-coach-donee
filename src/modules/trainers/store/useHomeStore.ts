import { create, StoreApi, UseBoundStore } from "zustand";

import { TransformedBooking } from "@server/database/models/Booking";

type State = {
  pendingBookings: TransformedBooking[];
  selectedMonth: Date;
};

type Actions = {
  setPendingBookings: (pendingBookings: TransformedBooking[]) => void;
  setSelectedMonth: (selectedDate: Date) => void;
};

const defaultState: State = {
  pendingBookings: [],
  selectedMonth: new Date(),
};

const useHomeStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setPendingBookings: (pendingBookings: TransformedBooking[]) =>
      set(() => ({ pendingBookings: [...pendingBookings] })),
    setSelectedMonth: (selectedMonth: Date) => set(() => ({ selectedMonth })),
  }),
);

export default useHomeStore;
