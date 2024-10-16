import React, { ReactElement } from "react";
import { Text, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { ActivityIndicator } from "@ant-design/react-native";
import { COLOR_BLUE } from "@src/modules/common/constants";

function PrimaryButton({
  text,
  textColor = "text-primary",
  primary = true,
  loading = false,
  size = "default",
  icon = <></>,
  backgroundColor = ["#60A5FA", "#98d3ff"],
  onPress,
}: {
  text: string;
  textColor?: string;
  primary?: boolean;
  loading?: boolean;
  size?: string;
  icon?: ReactElement;
  backgroundColor?: [string, string];
  onPress?: () => void;
}): ReactElement {
  return (
    <TouchableOpacity
      style={{ elevation: 2 }}
      className={`${size === "small" ? "h-[40]" : "h-[50]"} rounded-full overflow-hidden`}
      onPress={onPress}
    >
      <LinearGradient
        colors={primary ? backgroundColor : ["#fff", "#fff"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="w-full h-full flex-row justify-center items-center gap-4"
      >
        {icon}
        <Text
          className={`${primary ? "text-white" : textColor} text-xl text-center font-semibold`}
        >
          {text}
        </Text>
        {loading && <ActivityIndicator color={primary ? "#fff" : COLOR_BLUE} />}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default PrimaryButton;
