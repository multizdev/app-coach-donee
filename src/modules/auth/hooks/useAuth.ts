import { useState } from "react";
import { Alert } from "react-native";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import useAppStore from "@src/modules/common/stores/useAppStore";
import { useRouter } from "expo-router";

type UserRegisterData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type UserLoginData = {
  email: string;
  password: string;
};

export default useAuth;

function useAuth() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { accountType, setAccountType, setUser } = useAppStore();

  const registerUser = async ({
    fullName,
    email,
    password,
  }: UserRegisterData) => {
    setIsLoading(true);
    try {
      const { user }: FirebaseAuthTypes.UserCredential =
        await auth().createUserWithEmailAndPassword(email, password);

      await user.updateProfile({
        displayName: fullName,
      });

      await firestore().collection(`${accountType}s`).doc(user.uid).set({
        fullName,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      setUser(user);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Registration error:", e);
        Alert.alert("Registration Error", e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const emailSignIn = async (values: UserLoginData) => {
    setIsLoading(true);
    try {
    } catch (e) {
      if (e instanceof Error) {
        console.error("Login error:", e);
        Alert.alert("Login Error", e.message);
      }
    }
  };

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    setIsLoading(true);

    if (user) {
      // Fetch user document
      const userDoc = await firestore().collection("Users").doc(user.uid).get();
      const trainerDoc = await firestore()
        .collection("Trainers")
        .doc(user.uid)
        .get();

      // Check if navigation is already handled to avoid repetitive navigation
      if (userDoc.exists) {
        replace("/user/home/(home)");
      } else if (trainerDoc.exists) {
        replace("/trainer/(home)");
      }
    } else {
      replace("/");
    }

    setAccountType(null);
    setIsLoading(false); // Stop loading when all processing is done
  };

  return { registerUser, emailSignIn, isLoading, onAuthStateChanged };
}
