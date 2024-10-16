import React, { ReactElement, useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

import firestore from "@react-native-firebase/firestore";

import { useRouter } from "expo-router";
import { Tabs, Toast } from "@ant-design/react-native";
import { Entypo } from "@expo/vector-icons";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import useUserBookings from "@src/modules/users/hooks/booking/useUserBookings";
import Trainer from "@server/database/models/Trainer";
import { COLOR_BLUE } from "@src/modules/common/constants";
import useAllChats from "@src/modules/users/hooks/chat/useAllChats";
import { Chat } from "@server/database/models/Chat";
import useAppStore from "@src/modules/common/stores/useAppStore";

const tabs = [{ title: "Current Chats" }, { title: "Your Trainers" }];

function ChatListItem({ chat }: { chat: Chat }): ReactElement {
  const { push } = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        push({
          pathname: "chat/[chat_id]",
          params: {
            chat_id: "Coach Donee",
          },
        })
      }
      style={{ elevation: 2 }}
      className="bg-white flex-row h-[70px] items-center gap-4 px-4 rounded-xl"
    >
      <Image
        className="rounded-full border-2 border-gray-200"
        source={require("@assets/background/coach.webp")}
        style={{ width: 55, height: 55 }}
      />
      <View className="w-full h-full justify-between py-4">
        <Text className="text-lg font-bold">
          {chat.trainer?.displayName || chat.trainer?.fullName}
        </Text>
        <Text className="text-md text-gray-600">Last message from coach</Text>
      </View>
    </TouchableOpacity>
  );
}

function TrainerChatItem({ trainer }: { trainer: Trainer }): ReactElement {
  const [disabled, setDisabled] = useState<boolean>(false);

  const onRefreshChats = useAllChats().onRefresh;
  const onRefreshBookings = useUserBookings().onRefresh;

  const user = useAppStore().user;

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.9}
      style={{ elevation: 2 }}
      className="bg-white flex-row items-center gap-4 px-4 rounded-xl"
      onPress={async () => {
        setDisabled(true);
        try {
          await firestore().collection("Chats").add({
            userId: user?.uid,
            trainerId: trainer.id,
            messages: [],
          });
          await Promise.all([onRefreshChats(), onRefreshBookings()]);
        } catch (e) {
          if (e instanceof Error) {
            Toast.show(e.message);
          }
        } finally {
          setDisabled(false);
        }
      }}
    >
      <Image
        className="rounded-full border-2 border-gray-200"
        source={require("@assets/background/coach.webp")}
        style={{ width: 55, height: 55 }}
      />
      <View className="w-full h-full justify-between py-4">
        <Text className="text-lg font-bold">
          {trainer.displayName || trainer.fullName}
        </Text>
        <View className="flex-row items-center gap-4">
          <Text className="text-lg text-gray-400">Start new chat</Text>
          <Entypo name="add-to-list" size={24} color={COLOR_BLUE} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ChatsTab() {
  const { allBookings, onRefresh, refreshing } = useUserBookings();
  const {
    chats,
    refreshing: chatsRefreshing,
    onRefresh: chatsOnRefresh,
  } = useAllChats();

  const trainers = useMemo(() => {
    const trainerMap = new Map<string, Trainer>();

    // Collect trainerIds that already have chats
    const trainerIdsWithChats = new Set(chats.map((chat) => chat.trainerId));

    allBookings.forEach((booking) => {
      const { trainer, trainerId } = booking;
      if (
        trainer &&
        !trainerMap.has(trainerId) &&
        !trainerIdsWithChats.has(trainerId)
      ) {
        trainerMap.set(trainerId, trainer);
      }
    });

    return Array.from(trainerMap.values());
  }, [allBookings, chats]);

  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <Tabs tabs={tabs}>
        <View className="flex-1 bg-white" key="chats">
          <FlatList
            contentContainerClassName="p-4 gap-4"
            refreshing={chatsRefreshing}
            onRefresh={chatsOnRefresh}
            data={chats}
            renderItem={({ item }) => <ChatListItem chat={item} />}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <View className="flex-1 bg-white justify-center items-center">
                <Text className="text-2xl text-gray-500">No chat started!</Text>
              </View>
            )}
          />
        </View>
        <View className="flex-1 bg-white" key="trainers">
          <FlatList
            contentContainerClassName="p-4 gap-4"
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={trainers}
            renderItem={({ item }) => <TrainerChatItem trainer={item} />}
            keyExtractor={(item: Trainer, index: number) => item.id + index}
            ListEmptyComponent={() => (
              <View className="flex-1 bg-white justify-center items-center">
                <Text className="text-2xl text-gray-500">No new trainer!</Text>
              </View>
            )}
          />
        </View>
      </Tabs>
    </GestureHandlerRootView>
  );
}

export default ChatsTab;
