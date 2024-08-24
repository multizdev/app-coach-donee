// ./src/components/input/TextInputField.tsx
import React from "react";
import { TextInput, View, Text, TextInputProps } from "react-native";
import { useField } from "formik";

interface TextInputFieldProps extends TextInputProps {
  name: string;
}

const TextInputField = ({ name, ...props }: TextInputFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <View>
      <View className="rounded-full">
        <TextInput
          className="h-[50] bg-gray-100 rounded-full px-4"
          onChangeText={field.onChange(name)}
          onBlur={field.onBlur(name)}
          value={field.value}
          {...props}
        />
      </View>
      {meta.touched && meta.error && (
        <Text className="text-red-500">{meta.error}</Text>
      )}
    </View>
  );
};

export default TextInputField;
