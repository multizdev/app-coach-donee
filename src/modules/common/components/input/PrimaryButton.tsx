import React, { ReactElement } from "react";
import { Text, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { ActivityIndicator } from "@ant-design/react-native";
import { COLOR_BLUE } from "@src/modules/common/constants";

function PrimaryButton({
  text,
  primary = true,
  loading = false,
  size = "default",
  onPress,
}: {
  text: string;
  primary?: boolean;
  loading?: boolean;
  size?: string;
  onPress?: () => void;
}): ReactElement {
  return (
    <TouchableOpacity
      style={{ elevation: 2 }}
      className={`${size === "small" ? "h-[40]" : "h-[50]"} rounded-full overflow-hidden`}
      onPress={onPress}
    >
      <LinearGradient
        colors={primary ? ["#60A5FA", "#98d3ff"] : ["#fff", "#fff"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="w-full h-full flex-row justify-center items-center gap-4"
      >
        <Text
          className={`${primary ? "text-white" : "text-primary"} text-xl text-center font-semibold`}
        >
          {text}
        </Text>
        {loading && <ActivityIndicator color={primary ? "#fff" : COLOR_BLUE} />}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default PrimaryButton;
