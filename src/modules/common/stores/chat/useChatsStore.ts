import { create, StoreApi, UseBoundStore } from "zustand";

import { Chat } from "@server/database/models/Chat";

type State = {
  chats: Chat[];
};

type Actions = {
  setChats: (chats: Chat[]) => void;
};

const defaultState: State = {
  chats: [],
};

const useChatsStore: UseBoundStore<StoreApi<State & Actions>> = create(
  (set): State & Actions => ({
    ...defaultState,
    setChats: (chats: Chat[]) => set(() => ({ chats: [...chats] })),
  }),
);

export default useChatsStore;
