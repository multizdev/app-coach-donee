import { create, StoreApi, UseBoundStore } from "zustand";

type State = {
  selectedMonth: Date;
};

type Actions = {
  setSelectedMonth: (selectedDate: Date) => void;
};

const defaultState: State = {
  selectedMonth: new Date(),
};

const useHomeStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setSelectedMonth: (selectedMonth: Date) => set(() => ({ selectedMonth })),
  }),
);

export default useHomeStore;
