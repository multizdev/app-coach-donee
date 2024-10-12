import { useEffect } from "react";

import firestore from "@react-native-firebase/firestore";

import Trainer from "@server/database/models/Trainer";
import useBookingStore from "@src/modules/users/stores/home/useBookingStore";

const useBookingTrainers = () => {
  const { allTrainers, setAllTrainers, serviceId, loading, setLoading } =
    useBookingStore();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await firestore()
          .collection("Trainers")
          .where("services", "array-contains", serviceId)
          .get();

        const trainersList: Trainer[] = [];
        querySnapshot.forEach((doc) => {
          trainersList.push({ id: doc.id, ...doc.data() } as Trainer);
        });

        setAllTrainers(trainersList);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchTrainers();
    }
  }, [serviceId]);

  return { allTrainers, loading };
};

export default useBookingTrainers;
