import { useEffect } from "react";

import firestore from "@react-native-firebase/firestore";

import { Activity } from "@server/database/models/Activity";
import useActivitiesStore from "@src/modules/users/stores/home/useActivitiesStore";

function useActivities() {
  const { services, loadingServices, setServices, setLoadingServices } =
    useActivitiesStore();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("Services")
      .onSnapshot((snapshot) => {
        const servicesList: Activity[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Activity, "id">),
        }));
        setServices(servicesList);
        setLoadingServices(false);
      });

    return () => unsubscribe();
  }, []);

  return { services, loadingServices };
}

export default useActivities;
