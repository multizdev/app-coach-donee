// ./src/components/auth/Register.tsx
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import TextInputField from "@src/modules/common/components/input/TextInputField";
import PasswordInput from "@src/modules/common/components/input/PasswordInput";
import { registerValidationSchema } from "@src/modules/auth/components/forms/validationSchemas";

const Register = () => {
  const { replace } = useRouter();
  return (
    <View className="flex-1 gap-4 bg-white rounded-t-full p-6">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerValidationSchema}
        onSubmit={(values) => {
          console.log("Success:", values);
          replace("home");
        }}
      >
        {({ handleSubmit }) => (
          <>
            <TextInputField name="fullName" placeholder="Full Name" />
            <TextInputField
              name="email"
              placeholder="Enter Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm Password"
            />

            <TouchableOpacity
              style={{ elevation: 2 }}
              className="h-[50] rounded-full overflow-hidden"
              onPress={() => handleSubmit()}
            >
              <LinearGradient
                colors={
                  [
                    "#60A5FA",
                    "#98d3ff",
                  ] /* Corresponds to blue-400 and blue-100 */
                }
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className="w-full h-full flex justify-center items-center"
              >
                <Text className="text-white text-center font-semibold">
                  Register
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Register;
