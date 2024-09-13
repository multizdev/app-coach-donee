import React, { useEffect } from "react";
import { ImageBackground, View, BackHandler } from "react-native";

import auth from "@react-native-firebase/auth";

import AuthScreen from "@src/modules/auth/screens/AuthScreen";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useAppStore from "@src/modules/common/stores/useAppStore";
import useAuth from "@src/modules/auth/hooks/useAuth";

function App() {
  const { onAuthStateChanged } = useAuth();
  const { accountType, setAccountType } = useAppStore();

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

    // auth().onAuthStateChanged(onAuthStateChanged);

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

export default App;
