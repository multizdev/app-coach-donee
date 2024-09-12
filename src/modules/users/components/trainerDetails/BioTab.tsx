import React, { ReactElement } from "react";
import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR_DARK_BLUE } from "@src/modules/common/constants";

function BioTab(): ReactElement {
  return (
    <ScrollView contentContainerClassName="flex-col p-4 pb-8 gap-4">
      <Text className="font-bold text-xl text-gray-500">Services</Text>
      <View className="w-full flex-row flex-wrap gap-2">
        {[
          "Personal Training",
          "Assisted Stretching",
          "Boxing",
          "Swimming",
          "Flexibility & Stretching",
          "Strength & Conditioning",
        ].map((item: string) => {
          return (
            <LinearGradient
              colors={[COLOR_DARK_BLUE, "#98d3ff"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              className="px-4 py-2 rounded-full overflow-hidden flex justify-center items-center bg-primary"
            >
              <Text className="text-white">{item}</Text>
            </LinearGradient>
          );
        })}
      </View>
      <Text className="font-bold text-xl text-gray-500">Experience</Text>
      <Text className="text-sm text-gray-500">
        Hello, my name is Donee, and I have 18 years of experience working in
        the UAE for top fitness organizations as a head coach, personal trainer,
        swimming coach, boxing coach, strength & conditioning coach, fitness
        manager, and recreation director. Contact me right away to begin your
        training to become the best version of yourself!
      </Text>

      <Text className="font-bold text-xl text-gray-500">Certificates</Text>
      <ScrollView contentContainerClassName="w-full flex-col gap-2">
        {[
          "Active IQ Level 3 Personal Training Diploma",
          "American Swimming Coaches Association Level 5",
          "Strength & Conditioning Level 4",
          "Kettlebell Level 2",
          "Hatton Boxing Basic and Advance",
          "Animal Flow Level 1",
          "Animal Flow Level 1",
          "Animal Flow Level 1",
          "Animal Flow Level 1",
        ].map((certificate: string, index: number) => (
          <Text key={certificate + index} className="text-md text-gray-500">
            <Text className="text-primary text-lg font-bold">{index + 1}.</Text>{" "}
            {certificate}
          </Text>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

export default BioTab;
