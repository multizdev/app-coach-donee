import React, { ReactElement } from "react";
import { Text, View } from "react-native";

function HeadingChips({
  text,
  color,
  width,
}: {
  text: string;
  color: string;
  width: number;
}): ReactElement {
  return (
    <View
      style={{ width, backgroundColor: color }}
      className="p-2 flex justify-center items-center rounded-full"
    >
      <Text className="text-sm">{text}</Text>
    </View>
  );
}

export default HeadingChips;
