// firebaseMessageHandler.ts
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
  // Perform any background logic here (e.g., saving the message to local storage)
});
