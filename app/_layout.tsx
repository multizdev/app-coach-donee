import React, { ReactElement, useEffect, useState } from "react";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { ActivityIndicator, Provider } from "@ant-design/react-native";

// Import your global CSS file
import "@/global.css";
import "@src/firebaseMessageHandler";

SplashScreen.preventAutoHideAsync().then();

function RootLayout(): ReactElement {
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

export default RootLayout;
