import React, { ReactElement, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { COLOR_BLUE } from "@src/modules/common/constants";
import { Activity } from "@server/database/models/Activity";
import Trainer from "@server/database/models/Trainer";
import { getTrainerServices } from "@server/utils/services";

function BioTab({ trainer }: { trainer: Trainer }): ReactElement {
  const [serviceActivities, setServiceActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (trainer) {
      (async () => {
        const servicesList: Activity[] = await getTrainerServices(
          trainer.services,
        );

        setServiceActivities(servicesList);
      })();
    }
  }, [trainer]);

  const { experience, certificates } = trainer;

  return (
    <ScrollView contentContainerClassName="flex-col p-4 pb-8 gap-4">
      <Text className="font-bold text-xl text-gray-500">Services</Text>
      <View className="w-full flex-row flex-wrap gap-2">
        {serviceActivities.map((service: Activity) => {
          return (
            <LinearGradient
              key={service.id}
              colors={[COLOR_BLUE, "#98d3ff"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              className="px-4 py-2 rounded-full overflow-hidden flex justify-center items-center bg-primary"
            >
              <Text className="text-white">{service.name}</Text>
            </LinearGradient>
          );
        })}
      </View>
      {experience && (
        <>
          <Text className="font-bold text-xl text-gray-500">Experience</Text>
          <Text className="text-sm text-gray-500">experience</Text>
        </>
      )}
      {certificates && (
        <>
          <Text className="font-bold text-xl text-gray-500">Certificates</Text>
          <ScrollView contentContainerClassName="w-full flex-col gap-2">
            {certificates.map((certificate: string, index: number) => (
              <Text key={certificate + index} className="text-md text-gray-500">
                <Text className="text-primary text-lg font-bold">
                  {index + 1}.
                </Text>{" "}
                {certificate}
              </Text>
            ))}
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
}

export default BioTab;
