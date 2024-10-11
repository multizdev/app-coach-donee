import { create, StoreApi, UseBoundStore } from "zustand";

import Trainer from "@server/database/models/Trainer";

import { Package } from "@server/database/models/Package";

type State = {
  allTrainers: Trainer[];
  serviceId: string | null;
  serviceName: string | null;
  trainerId: string | null;
  loading: boolean;
  selectedPackage: Package | null;
  date: string | null;
  time: string | null;
};

type Actions = {
  setServiceId: (serviceId: string) => void;
  setServiceName: (serviceName: string) => void;
  setTrainerId: (trainerId: string) => void;
  setAllTrainers: (allTrainers: Trainer[]) => void;
  setLoading: (loading: boolean) => void;
  setPackage: (pkg: Package) => void;
  setBookingDate: (date: string) => void;
  setBookingTime: (time: string) => void;
};

const defaultState: State = {
  serviceId: null,
  serviceName: null,
  trainerId: null,
  allTrainers: [],
  loading: false,
  selectedPackage: null,
  date: null,
  time: null,
};

const useActivitiesStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setServiceId: (serviceId: string) => set(() => ({ serviceId })),
    setServiceName: (serviceName: string) => set(() => ({ serviceName })),
    setTrainerId: (trainerId: string) => set(() => ({ trainerId })),
    setAllTrainers: (allTrainers: Trainer[]) =>
      set(() => ({ allTrainers: [...allTrainers] })),
    setLoading: (loading: boolean) => set(() => ({ loading })),
    setPackage: (pkg: Package) => set(() => ({ selectedPackage: pkg })),
    setBookingDate: (date: string | null) => set(() => ({ date })),
    setBookingTime: (time: string | null) => set(() => ({ time })),
  }),
);

export default useActivitiesStore;
