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

export default useAuth;

function useAuth() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { accountType, setUser } = useAppStore();

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

      await onAuthStateChanged();
    } catch (e) {
      if (e instanceof Error) {
        console.error("Registration error:", e);
        Alert.alert("Registration Error", e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onAuthStateChanged = async () => {
    const user = auth().currentUser;

    if (user) {
      setIsLoading(true);
      setUser(user);

      const userDoc = await firestore().collection("Users").doc(user.uid).get();
      const trainerDoc = await firestore()
        .collection("Trainers")
        .doc(user.uid)
        .get();

      setIsLoading(false);

      if (userDoc.exists) {
        replace("/user/home/(home)");
      } else if (trainerDoc.exists) {
        replace("/trainer/(home)");
      }
    } else if (user === null) {
      replace("/");
    }
  };

  return { registerUser, isLoading, onAuthStateChanged };
}
