import { create, StoreApi, UseBoundStore } from "zustand";

type State = {
  authState: string;
};

type Actions = {
  setAuthState: (authState: string) => void;
};

const defaultState: State = {
  authState: "login",
};

const useAppStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setAuthState: (authState: string) => set(() => ({ authState })),
  }),
);

export default useAppStore;
