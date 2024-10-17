import firestore from "@react-native-firebase/firestore";

import { Toast } from "@ant-design/react-native";

import { Activity } from "@server/database/models/Activity";

async function getTrainerServices(services: string[]) {
  try {
    const servicesSnapshot = await firestore()
      .collection("Services")
      .where(firestore.FieldPath.documentId(), "in", services)
      .get();

    return servicesSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as Activity;
    });
  } catch (error) {
    if (error instanceof Error) {
      Toast.show("There was a problem.");
    }
  }
}

export { getTrainerServices };
