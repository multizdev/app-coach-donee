import React, { ReactElement, useEffect, useState } from "react";

import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import auth from "@react-native-firebase/auth";

import { ActivityIndicator, Provider, Toast } from "@ant-design/react-native";
import useAppStore from "@src/modules/common/stores/useAppStore";
import useAuth from "@src/modules/auth/hooks/useAuth";

// Import your global CSS file
import "@/global.css";
import "@src/firebaseMessageHandler";
import messaging from "@react-native-firebase/messaging";

SplashScreen.preventAutoHideAsync().then();

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

function RootLayout(): ReactElement {
  const { push } = useRouter();
  const { user, setUser } = useAppStore();
  const { onAuthStateChanged } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleNotificationResponse = (
    notification: Notifications.Notification,
  ) => {
    if (notification.request.content.data) {
      const { activityId, activityType } = notification.request.content.data;

      console.log("DATA", activityId, activityType, user);

      if (activityType === "chat") {
        try {
          // Ensure correct navigation based on the chat ID and type
          push({
            pathname: `chat/[chat_id]`,
            params: {
              chat_id: activityId,
              type: "User",
            },
          });
        } catch (e) {
          console.log("ISSUE", e);
        }
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
    async function loadFonts() {
      try {
        await Font.loadAsync({
          antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
          antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
        });
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    (async () => loadFonts())();
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
  }, [user]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "white",
          },
          title: "Welcome",
          animation: "slide_from_right",
        }}
      />
      <StatusBar style="dark" />
    </Provider>
  );
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

export default RootLayout;
