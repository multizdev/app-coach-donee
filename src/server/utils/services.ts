import firestore from "@react-native-firebase/firestore";

import { Activity } from "@server/database/models/Activity";

async function getTrainerServices(services: string[]) {
  const servicesSnapshot = await firestore()
    .collection("Services")
    .where(firestore.FieldPath.documentId(), "in", services)
    .get();

  return servicesSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as Activity;
  });
}

export { getTrainerServices };
