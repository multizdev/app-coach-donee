// ./src/components/auth/Login.tsx
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { Formik } from "formik";
import { Icon } from "@ant-design/react-native";

import TextInputField from "@src/modules/common/components/input/TextInputField";
import PasswordInput from "@src/modules/common/components/input/PasswordInput";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useAuth from "@src/modules/auth/hooks/useAuth";
import { loginValidationSchema } from "@src/modules/auth/components/forms/validationSchemas";

const Login = () => {
  const { isLoading, emailSignIn } = useAuth();

  return (
    <View className="flex-1 gap-4 bg-white rounded-t-full p-6">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={emailSignIn}
      >
        {({ handleSubmit }) => (
          <>
            <TextInputField
              name="email"
              placeholder="Enter Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <PasswordInput name="password" placeholder="Password" />

            <TouchableOpacity>
              <Text className="text-blue-400 text-right">Forgot Password?</Text>
            </TouchableOpacity>
            <PrimaryButton
              text="Sign In"
              onPress={handleSubmit}
              loading={isLoading}
            />
          </>
        )}
      </Formik>

      <View className="w-full flex items-center">
        <Text className="text-xs text-gray-400">Sign in with Social</Text>
      </View>

      <View className="w-full h-auto flex flex-row items-center justify-center gap-4">
        <TouchableOpacity
          style={{ elevation: 4 }}
          className="w-12 h-12 bg-red-500 rounded-full flex justify-center items-center"
        >
          <Icon name="google" color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ elevation: 4 }}
          className="w-12 h-12 bg-black rounded-full flex justify-center items-center"
        >
          <Icon name="apple" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
