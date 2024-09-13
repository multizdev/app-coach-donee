// ./src/components/auth/Register.tsx
import React, { ReactElement } from "react";
import { View } from "react-native";

import { Formik } from "formik";

import TextInputField from "@src/modules/common/components/input/TextInputField";
import PasswordInput from "@src/modules/common/components/input/PasswordInput";
import { registerValidationSchema } from "@src/modules/auth/components/forms/validationSchemas";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useAuth from "@src/modules/auth/hooks/useAuth";

function Register(): ReactElement | null {
  const { registerUser, isLoading } = useAuth();

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
        onSubmit={registerUser}
      >
        {({ handleSubmit }) => (
          <>
            <TextInputField name="fullName" placeholder="Full Name" />
            <TextInputField
              name="email"
              placeholder="Enter Emaila"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm Password"
            />

            <PrimaryButton
              text="Register"
              onPress={handleSubmit}
              loading={isLoading}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

export default Register;
