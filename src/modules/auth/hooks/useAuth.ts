import { useEffect, useState } from "react";
import { Alert } from "react-native";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";

import { useRouter } from "expo-router";

import useAppStore from "@src/modules/common/stores/useAppStore";
import User from "@server/database/models/User";
import Trainer from "@server/database/models/Trainer";

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

  const {
    user,
    accountType,
    setAccountType,
    setUser,
    setDetailedUser,
    setDetailedTrainer,
  } = useAppStore();

  useEffect(() => {
    // Handle FCM token generation and update on state changes
    const updateFCMToken = async () => {
      if (user) {
        const token = await messaging().getToken();
        await firestore().collection(`${accountType}s`).doc(user.uid).update({
          fcmToken: token,
        });
      }
    };

    (async () => updateFCMToken())();

    return messaging().onTokenRefresh(async (token) => {
      if (user) {
        await firestore().collection(`${accountType}s`).doc(user.uid).update({
          fcmToken: token,
        });
      }
    }); // Cleanup on unmount
  }, [accountType, user]);

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

      const userDocData = {
        fullName,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      if (accountType === "User") {
        await firestore()
          .collection("Users")
          .doc(user.uid)
          .set({
            ...userDocData,
            access: true,
          });
      } else if (accountType === "Trainer") {
        await firestore()
          .collection("Trainers")
          .doc(user.uid)
          .set({
            ...userDocData,
            access: true,
            status: "active",
            services: [],
            packages: [],
          });
      }

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

  const emailSignIn = async ({ email, password }: UserLoginData) => {
    setIsLoading(true);
    try {
      const { user }: FirebaseAuthTypes.UserCredential =
        await auth().signInWithEmailAndPassword(email, password);

      // Fetch the user document from Firestore
      const userDoc = await firestore().collection("Users").doc(user.uid).get();
      const trainerDoc = await firestore()
        .collection("Trainers")
        .doc(user.uid)
        .get();

      // Set the user in the stores
      setUser(user);

      if (userDoc.exists) {
        setDetailedUser(userDoc.data() as User);
        replace("/user/home/(home)");
      } else if (trainerDoc.exists) {
        setDetailedUser(trainerDoc.data() as Trainer);
        replace("/trainer/(home)");
      } else {
        // If no role found, navigate to a default page
        replace("/");
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("Login error:", e);
        Alert.alert("Login Error", e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    const unsubscribeUser = firestore()
      .collection("Users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setDetailedUser(doc.data() as User);
        }
      });

    const unsubscribeTrainer = firestore()
      .collection("Trainers")
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setDetailedTrainer(doc.data() as Trainer);
        }
      });

    return () => {
      unsubscribeUser();
      unsubscribeTrainer();
    };
  }, [user]);

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
        setAccountType("User");
        setDetailedUser(userDoc.data() as User);
        replace("/user/home/(home)");
      } else if (trainerDoc.exists) {
        setAccountType("Trainer");
        setDetailedTrainer(trainerDoc.data() as Trainer);
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
