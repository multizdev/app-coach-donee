import { useEffect, useState } from "react";
import useAppStore from "@src/modules/common/stores/useAppStore";
import useChatsStore from "@src/modules/common/stores/chat/useChatsStore";
import firestore from "@react-native-firebase/firestore";
import { Chat } from "@server/database/models/Chat";
import { Toast } from "@ant-design/react-native";
import User from "@server/database/models/User";

function useAllTrainerChats() {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { user } = useAppStore();
  const { chats, setChats } = useChatsStore();

  const fetchChats = async () => {
    if (user) {
      try {
        const chatsSnapshot = await firestore()
          .collection("Chats")
          .where("trainerId", "==", user.uid)
          .get();

        const chats: Chat[] = chatsSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Chat,
        );

        const userIds = chats.map((chat) => chat.userId);

        if (userIds.length) {
          const usersSnapshot = await firestore()
            .collection("Users")
            .where(firestore.FieldPath.documentId(), "in", userIds)
            .get();

          const users = usersSnapshot.docs.reduce(
            (acc, userDoc) => {
              acc[userDoc.id] = {
                ...userDoc.data(),
                id: userDoc.id,
              } as User;
              return acc;
            },
            {} as Record<string, User>,
          );

          const chatsWithUsers: Chat[] = chats.map((chat) => ({
            ...chat,
            user: users[chat.userId],
          })) as Chat[];

          setChats(chatsWithUsers);
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

export default useAllTrainerChats;
