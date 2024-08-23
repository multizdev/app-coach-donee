import React, { ReactElement, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Icon } from "@ant-design/react-native";

function Login(): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Handle sign-in logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login");
  };

  return (
    <View className="flex-1 gap-4 bg-white rounded-t-full p-6">
      <TextInput
        className="h-[50px] bg-gray-100 rounded-full px-4 py-2"
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="h-[50px] bg-gray-100 rounded-full px-4 py-2"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity>
        <Text className="text-blue-400 text-right mb-4">Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex justify-center items-center h-[50px] bg-blue-400 rounded-full"
        onPress={handleSignIn}
      >
        <Text className="text-white text-center font-semibold">Sign In</Text>
      </TouchableOpacity>
      <View className="w-full flex items-center">
        <Text className="text-[10px]">Sign in with Social</Text>
      </View>
      <View className="w-full h-[50] flex items-center justify-center">
        <TouchableOpacity
          className="w-[50] h-[50] bg-red-500 rounded-[25] flex justify-center items-center"
          onPress={handleGoogleLogin}
        >
          <Icon name="google" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
