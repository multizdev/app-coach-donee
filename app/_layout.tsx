import React, { ReactElement, useEffect, useState } from "react";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import auth from "@react-native-firebase/auth";

import { ActivityIndicator, Provider, Toast } from "@ant-design/react-native";
import useAppStore from "@src/modules/common/stores/useAppStore";
import useAuth from "@src/modules/auth/hooks/useAuth";

// Import your global CSS file
import "@/global.css";

SplashScreen.preventAutoHideAsync().then();

function RootLayout(): ReactElement {
  const { user, setUser } = useAppStore();
  const { onAuthStateChanged } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
    return <ActivityIndicator size="large" />; // Keep the splash screen visible while loading fonts
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

export default RootLayout;
