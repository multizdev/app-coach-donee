import React, { useEffect, useState } from "react";
import { ImageBackground, View, BackHandler } from "react-native";

import AuthScreen from "@src/modules/auth/screens/AuthScreen";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useAppStore from "@src/modules/common/stores/useAppStore";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import auth from "@react-native-firebase/auth";
import { Toast } from "@ant-design/react-native";
import useAuth from "@src/modules/auth/hooks/useAuth";
import messaging from "@react-native-firebase/messaging";
import { NotificationParams } from "@src/types";

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function requestUserPermission(): Promise<boolean> {
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
}

function App() {
  const [notificationScreen, setNotificationScreen] =
    useState<NotificationParams | null>(null);

  const { user, setUser } = useAppStore();
  const { onAuthStateChanged } = useAuth(notificationScreen);

  const { accountType, setAccountType } = useAppStore();

  const handleNotificationResponse = (
    notification: Notifications.Notification,
  ) => {
    if (notification.request.content.data) {
      const { activityId, activityType, activityUserType } =
        notification.request.content.data;

      if (activityType === "chat") {
        setNotificationScreen({
          pathname: "chat/[chat_id]",
          params: {
            chat_id: activityId,
            type: activityUserType,
          },
        });
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    (async (): Promise<void> => {
      await registerForPushNotificationsAsync();
      await requestUserPermission();
    })();

    // Handle last notification response on app launch (when app is terminated)
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      handleNotificationResponse(response.notification);
    });

    // Handle notification response when the app is in the foreground or background
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleNotificationResponse(response.notification);
      });

    return () => {
      isMounted = false;
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    try {
      if (user === null) {
        setUser(auth().currentUser);
      }
      (async () => await onAuthStateChanged(user))();
    } catch (e) {
      if (e instanceof Error) Toast.show("Could not load user!");
    }
  }, [user, notificationScreen]);

  useEffect(() => {
    const backAction = () => {
      if (accountType !== null) {
        setAccountType(null);
        return true; // Prevent default back action
      }
      return false; // Allow default back action
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [accountType]);

  if (accountType === null)
    return (
      <ImageBackground
        source={require("@assets/background/coach.webp")}
        className="flex-1 justify-end items-center"
        imageStyle={{ resizeMode: "cover" }}
      >
        <View className="w-full p-4 gap-4">
          <PrimaryButton
            text="Get Started"
            primary={false}
            onPress={() => setAccountType("User")}
          />
          <PrimaryButton
            text="Trainer"
            onPress={() => setAccountType("Trainer")}
          />
        </View>
      </ImageBackground>
    );

  return <AuthScreen />;
}

async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  if (Device.osName === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  return (
    await Notifications.getExpoPushTokenAsync({
      projectId: "f42aa10b-990d-4624-a5c6-95e2da52de82",
    })
  ).data;
}

export default App;
