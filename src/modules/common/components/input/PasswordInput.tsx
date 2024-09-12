// ./src/components/input/PasswordInput.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  TextInputProps,
} from "react-native";
import { useField } from "formik";
import { Icon } from "@ant-design/react-native";

interface PasswordInputProps extends TextInputProps {
  name: string;
  placeholder: string;
}

const PasswordInput = ({ name, placeholder, ...props }: PasswordInputProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [field, meta] = useField(name);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="flex-col gap-2">
      <View
        style={{ elevation: 2 }}
        className="flex-row bg-white items-center rounded-full px-4"
      >
        <TextInput
          className="flex-1 h-[50]"
          secureTextEntry={!isPasswordVisible}
          placeholder={placeholder}
          onChangeText={field.onChange(name)}
          onBlur={field.onBlur(name)}
          value={field.value}
          {...props}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} className="p-2">
          <Icon
            name={isPasswordVisible ? "eye" : "eye-invisible"}
            size="md"
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {meta.touched && meta.error && (
        <Text className="text-red-500 mt-1">{meta.error}</Text>
      )}
    </View>
  );
};

export default PasswordInput;
