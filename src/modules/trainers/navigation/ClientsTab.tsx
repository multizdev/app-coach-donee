import React, { ReactElement } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Fontisto, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { COLOR_BLUE } from "@src/modules/common/constants";

type ClientData = {
  name: string;
  sessions: number;
};

const clients: ClientData[] = [
  { name: "Dr. Farah Qadir", sessions: 12 },
  { name: "Amine Mh", sessions: 14 },
  { name: "Hany Bedair", sessions: 6 },
  { name: "Maram", sessions: 20 },
  { name: "Maram", sessions: 20 },
  { name: "Maram", sessions: 20 },
];

function Client({ item }: { item: ClientData }): ReactElement {
  return (
    <View
      style={{ elevation: 2 }}
      className="flex-row items-center m-4 mb-1 p-4 gap-4 bg-white rounded-3xl"
    >
      <View
        className="w-[70] h-[70] flex justify-center items-center rounded-full bg-white"
        style={{ elevation: 4 }}
      >
        <FontAwesome6 name="user-circle" size={60} color={COLOR_BLUE} />
      </View>
      <View className="flex-col">
        <Text className="font-bold text-xl text-gray-500">{item.name}</Text>
        <Text className="text-sm text-gray-500">
          Unscheduled sessions: {item.sessions}
        </Text>
      </View>
    </View>
  );
}

function ClientsTab(): ReactElement {
  return (
    <View className="flex-1 gap-4 bg-white">
      <View
        style={{ elevation: 4 }}
        className="flex-row items-center m-4 py-2 px-4 gap-4 bg-white rounded-3xl"
      >
        <Fontisto name="search" size={20} color="black" />
        <TextInput className="flex-1 h-10 p-2" placeholder="Search Client" />
      </View>
      <View className="flex-1">
        <FlatList
          data={clients}
          keyExtractor={(item: ClientData, index: number) => item.name + index}
          renderItem={({ item }: { item: ClientData }) => (
            <Client item={item} />
          )}
        />
      </View>
      <View className="w-full p-2">
        <TouchableOpacity
          style={{ elevation: 2 }}
          className="h-[50] rounded-full overflow-hidden"
        >
          <LinearGradient
            colors={
              ["#60A5FA", "#98d3ff"] /* Corresponds to blue-400 and blue-100 */
            }
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="w-full h-full flex justify-center items-center"
          >
            <Text className="text-white text-center font-semibold">
              Add new client
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ClientsTab;
