import { create, StoreApi, UseBoundStore } from "zustand";

import { Booking } from "@server/database/models/Booking";

type State = {
  allBookings: Booking[];
  loading: boolean;
};

type Actions = {
  setAllBookings: (bookings: Booking[]) => void;
  setLoading: (loading: boolean) => void;
};

const defaultState: State = {
  allBookings: [],
  loading: false,
};

const useUserBookingStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setAllBookings: (bookings: Booking[]) =>
      set(() => ({ allBookings: [...bookings] })),
    setLoading: (loading: boolean) => set(() => ({ loading })),
  }),
);

export default useUserBookingStore;
