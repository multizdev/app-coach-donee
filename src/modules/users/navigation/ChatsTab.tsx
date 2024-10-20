import React, { ReactElement, useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import firestore from "@react-native-firebase/firestore";

import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { Tabs, Toast } from "@ant-design/react-native";

import { Avatar } from "react-native-paper";
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

  const { messages } = chat;

  return (
    <TouchableOpacity
      onPress={() =>
        push({
          pathname: "chat/[chat_id]",
          params: {
            chat_id: chat.id,
            type: "User",
          },
        })
      }
      style={{ elevation: 2 }}
      className="bg-white flex-row h-[70px] items-center gap-4 px-4 rounded-xl"
    >
      {chat.trainer?.photoURL ? (
        <Avatar.Image
          style={{ elevation: 2 }}
          source={{ uri: chat.trainer?.photoURL || "" }}
          size={50}
        />
      ) : (
        <Avatar.Text
          style={{ elevation: 2, backgroundColor: COLOR_BLUE }}
          size={50}
          color="white"
          label={(chat.trainer?.displayName || chat.trainer?.fullName)!
            .charAt(0)
            .toUpperCase()}
        />
      )}

      <View className="w-full h-full justify-between py-4">
        <Text className="text-lg font-bold">
          {chat.trainer?.displayName || chat.trainer?.fullName}
        </Text>
        {messages && messages[messages.length - 1] && (
          <View className="flex-row items-center gap-2">
            <Text className="text-md text-gray-600">
              {messages[messages.length - 1].sender === "user"
                ? `${chat.user?.displayName || chat.user?.fullName}:`
                : "You:"}
            </Text>
            <Text className="text-md text-gray-600">
              {messages[messages.length - 1].message || "Send a message"}
            </Text>
          </View>
        )}
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
      {trainer?.photoURL ? (
        <Avatar.Image
          style={{ elevation: 2 }}
          source={{ uri: trainer?.photoURL || "" }}
          size={50}
        />
      ) : (
        <Avatar.Text
          style={{ elevation: 2, backgroundColor: COLOR_BLUE }}
          size={50}
          color="white"
          label={"U"}
        />
      )}
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
