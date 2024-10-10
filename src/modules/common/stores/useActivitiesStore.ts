import { create, StoreApi, UseBoundStore } from "zustand";

import { Activity } from "@server/database/models/Activity";

type State = {
  services: Activity[];
  loadingServices: boolean;
};

type Actions = {
  setServices: (services: Activity[]) => void;
  setLoadingServices: (loadingServices: boolean) => void;
};

const defaultState: State = {
  services: [],
  loadingServices: true,
};

const useActivitiesStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setLoadingServices: (loadingServices: boolean) =>
      set(() => ({ loadingServices })),
    setServices: (services: Activity[]) =>
      set(() => ({ services: [...services] })),
  }),
);

export default useActivitiesStore;
