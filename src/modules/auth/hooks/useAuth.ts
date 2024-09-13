import { Alert } from "react-native";

import firebase from "@react-native-firebase/app";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

type UserRegisterData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function useAuth() {
  const registerUser = async ({ email, password }: UserRegisterData) => {
    try {
      const userCredentials: FirebaseAuthTypes.UserCredential =
        await auth().createUserWithEmailAndPassword(email, password);

      console.log("USER", userCredentials.user);
      console.log("Additional Info", userCredentials.additionalUserInfo);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Registration error:", e);
        Alert.alert("Registration Error", e.message);
      }
    }
  };

  return { registerUser };
}

export default useAuth;
