import React, { ReactElement, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import TextInputField from "@src/modules/common/components/input/TextInputField";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useActivities from "@src/modules/common/hooks/useActivities";
import { Activity } from "@server/database/models/Activity";
import useAppStore from "@src/modules/common/stores/useAppStore";
import { ActivityIndicator, Toast } from "@ant-design/react-native";
import firestore from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";

const experienceSchema = Yup.object().shape({
  bio: Yup.string().required("Bio/Experience is required"),
  certificates: Yup.array().of(
    Yup.string().required("Certificate is required"),
  ),
});

function ExperienceDetailsScreen(): ReactElement {
  const { back, canGoBack } = useRouter();

  const { services } = useActivities();
  const { user, detailedTrainer, setDetailedTrainer } = useAppStore();

  const [certificates, setCertificates] = useState<string[]>(
    detailedTrainer?.certificates || [""],
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    detailedTrainer?.services || [],
  );

  if (detailedTrainer) {
    const addCertificateField = () => {
      setCertificates([...certificates, ""]);
    };

    const toggleSkill = (skillId: string) => {
      if (selectedSkills.includes(skillId)) {
        setSelectedSkills(selectedSkills.filter((s) => s !== skillId));
      } else {
        setSelectedSkills([...selectedSkills, skillId]);
      }
    };

    const updateTrainerDetails = async (values: {
      bio: string;
      certificates: string[];
    }) => {
      try {
        const trainerDoc = firestore().collection("Trainers").doc(user?.uid);
        await trainerDoc.update({
          experience: values.bio,
          certificates: values.certificates,
          services: selectedSkills,
        });

        // Update the local state to reflect the changes
        setDetailedTrainer({
          ...detailedTrainer,
          experience: values.bio,
          certificates: values.certificates,
          services: selectedSkills,
        });

        if (canGoBack()) back();
      } catch (error) {
        console.error("Failed to update trainer details: ", error);
      }
    };

    return (
      <Formik
        initialValues={{
          bio: detailedTrainer.experience || "",
          certificates: certificates,
        }}
        validationSchema={experienceSchema}
        onSubmit={async (values) => {
          try {
            await updateTrainerDetails(values);
          } catch (error) {
            if (error instanceof Error) {
              Toast.show("There was a problem.");
            }
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values, errors, touched }) => (
          <View className="flex-1 bg-white p-4 gap-4">
            <TextInputField name="bio" placeholder="Enter Bio/Experience" />
            {errors.bio && touched.bio && (
              <Text style={{ color: "red" }}>{errors.bio}</Text>
            )}
            <View className="flex-col gap-2">
              <View className="flex-row items-center justify-between px-2">
                <Text className="text-primary font-bold text-xl">
                  Certificates
                </Text>
                <TouchableOpacity
                  className="w-[30] h-[30] rounded-xl overflow-hidden"
                  onPress={() => {
                    addCertificateField();
                    setFieldValue("certificates", [...values.certificates, ""]);
                  }}
                >
                  <LinearGradient
                    colors={["#76A9FA", "#98d3ff"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    className="w-full h-full flex justify-center items-center"
                  >
                    <MaterialIcons name="add" size={24} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              {values.certificates.map((cert, index) => (
                <TextInputField
                  key={index}
                  name={`certificates[${index}]`}
                  placeholder={`Certificate #${index + 1}`}
                />
              ))}
            </View>
            {errors.certificates && touched.certificates && (
              <Text style={{ color: "red" }}>
                {Array.isArray(errors.certificates) &&
                  errors.certificates.map((error, i) => (
                    <Text key={i}>{error}</Text>
                  ))}
              </Text>
            )}
            <View className="flex-col gap-4">
              <Text className="text-primary font-bold text-xl">Skills</Text>
              <View className="flex-row gap-4 flex-wrap">
                {services.map(({ id, name }: Activity) => (
                  <TouchableOpacity key={id} onPress={() => toggleSkill(id)}>
                    <LinearGradient
                      colors={
                        selectedSkills.includes(id)
                          ? ["#60A5FA", "#98d3ff"]
                          : ["#fff", "#fff"]
                      }
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      style={{ elevation: 4 }}
                      className="rounded-full p-2 px-4 overflow-hidden"
                    >
                      <Text
                        className={
                          selectedSkills.includes(id)
                            ? "text-white"
                            : "text-black"
                        }
                      >
                        {name}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <PrimaryButton text="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    );
  }
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator />
    </View>
  );
}

export default ExperienceDetailsScreen;
