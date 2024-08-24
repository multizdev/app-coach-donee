import React, { ReactElement } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@ant-design/react-native";
import { LinearGradient } from "expo-linear-gradient";

type HeaderType = {
  textFirst: string;
  textBottom: string;
  action: () => void;
};

function CustomHeader({
  textFirst,
  textBottom,
  action,
}: HeaderType): ReactElement {
  return (
    <View className="w-full h-[100] flex flex-row items-center gap-6 bg-white p-4 rounded-full">
      <TouchableOpacity
        style={{
          width: 80,
          borderRadius: 30,
          borderWidth: 3,
          borderStyle: "solid",
          borderColor: "#3c3c3c",
          backgroundColor: "#242424",
        }}
        onPress={action}
        className="h-full overflow-hidden bg-black rounded-3xl border-2 border-amber-50 flex justify-center items-center"
      >
        <LinearGradient
          colors={
            ["#242424", "#4a4a4a"] /* Corresponds to blue-400 and blue-100 */
          }
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="w-full h-full flex-1 justify-center items-center"
        >
          <Icon name="arrow-left" color="white" />
        </LinearGradient>
      </TouchableOpacity>
      <View className="flex-1 flex-col">
        <Text style={{ fontSize: 30 }}>{textFirst}</Text>
        <Text style={{ fontSize: 30 }} className="font-bold">
          {textBottom}
        </Text>
      </View>
    </View>
  );
}

export default CustomHeader;
