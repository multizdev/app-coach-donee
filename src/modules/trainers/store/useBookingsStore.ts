import { create, StoreApi, UseBoundStore } from "zustand";

type State = {
  selectedDate: Date;
};

type Actions = {
  setSelectedDate: (selectedDate: Date) => void;
};

const defaultState: State = {
  selectedDate: new Date(),
};

const useBookingsStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setSelectedDate: (selectedDate: Date) => set(() => ({ selectedDate })),
  }),
);

export default useBookingsStore;
