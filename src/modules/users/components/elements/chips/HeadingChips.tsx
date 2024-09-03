import React, { ReactElement } from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient
      colors={["#53af83", "#7adaae"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={{ width, backgroundColor: color }}
      className="p-2 flex justify-center items-center rounded-full overflow-hidden"
    >
      <Text className="text-sm text-white">{text}</Text>
    </LinearGradient>
  );
}

export default HeadingChips;
