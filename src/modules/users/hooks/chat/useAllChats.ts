import { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";

import useAppStore from "@src/modules/common/stores/useAppStore";
import { Chat } from "@server/database/models/Chat";
import useChatsStore from "@src/modules/common/stores/chat/useChatsStore";
import Trainer from "@server/database/models/Trainer";
import { Toast } from "@ant-design/react-native";

function useAllChats() {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { user } = useAppStore();
  const { chats, setChats } = useChatsStore();

  const fetchChats = async () => {
    if (user) {
      try {
        const chatsSnapshot = await firestore()
          .collection("Chats")
          .where("userId", "==", user.uid)
          .get();

        const chats: Chat[] = chatsSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Chat,
        );

        const trainerIds = chats.map((chat) => chat.trainerId);

        if (trainerIds.length) {
          const trainersSnapshot = await firestore()
            .collection("Trainers")
            .where(firestore.FieldPath.documentId(), "in", trainerIds)
            .get();

          const trainers = trainersSnapshot.docs.reduce(
            (acc, trainerDoc) => {
              acc[trainerDoc.id] = {
                ...trainerDoc.data(),
                id: trainerDoc.id,
              } as Trainer;
              return acc;
            },
            {} as Record<string, Trainer>,
          );

          const chatsWithTrainers: Chat[] = chats.map((chat) => ({
            ...chat,
            trainer: trainers[chat.trainerId],
          })) as Chat[];

          setChats(chatsWithTrainers);
        } else setChats([]);
      } catch (error) {
        if (error instanceof Error) {
          Toast.show("Cannot load bookings!");
        }
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchChats();
    setRefreshing(false);
  };

  useEffect(() => {
    if (user) {
      (async () => onRefresh())();
    }
  }, [user]);

  return { chats, refreshing, onRefresh };
}

export default useAllChats;
