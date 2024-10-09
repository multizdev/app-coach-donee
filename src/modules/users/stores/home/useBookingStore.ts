import { create, StoreApi, UseBoundStore } from "zustand";

import Trainer from "@server/database/models/Trainer";

type State = {
  allTrainers: Trainer[];
  serviceId: string | null;
  trainerId: string | null;
  loading: boolean;
};

type Actions = {
  setServiceId: (serviceId: string) => void;
  setTrainerId: (trainerId: string) => void;
  setAllTrainers: (allTrainers: Trainer[]) => void;
  setLoading: (loading: boolean) => void;
};

const defaultState: State = {
  serviceId: null,
  trainerId: null,
  allTrainers: [],
  loading: false,
};

const useActivitiesStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setServiceId: (serviceId: string) => set(() => ({ serviceId })),
    setTrainerId: (trainerId: string) => set(() => ({ trainerId })),
    setAllTrainers: (allTrainers: Trainer[]) =>
      set(() => ({ allTrainers: [...allTrainers] })),
    setLoading: (loading: boolean) => set(() => ({ loading })),
  }),
);

export default useActivitiesStore;
