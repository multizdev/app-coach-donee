// firebaseMessageHandler.ts
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async () => {
  // Perform any background logic here (e.g., saving the message to local storage)
});
