import React, { ReactElement, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import * as Yup from "yup";
import { Formik } from "formik";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import TextInputField from "@src/modules/common/components/input/TextInputField";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";

const experienceSchema = Yup.object().shape({
  bio: Yup.string().required("Bio/Experience is required"),
  certificates: Yup.array().of(
    Yup.string().required("Certificate is required"),
  ),
});

function ExperienceDetailsScreen(): ReactElement {
  const [certificates, setCertificates] = useState<string[]>([""]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const skillsOptions = [
    "Personal Assistant",
    "Kick Boxing",
    "Swimming",
    "Stretching & Conditioning",
  ];

  const addCertificateField = () => {
    setCertificates([...certificates, ""]);
  };

  const updateCertificate = (index: number, text: string) => {
    const newCertificates = [...certificates];
    newCertificates[index] = text;
    setCertificates(newCertificates);
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <Formik
      initialValues={{ bio: "", certificates: certificates }}
      validationSchema={experienceSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit, setFieldValue, values, errors, touched }) => (
        <View className="flex-1 bg-white p-4 gap-4">
          <TextInputField
            name="experience"
            placeholder="Enter Bio/Experience"
          />
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
                key={cert + index}
                name={`certificates[${index}]`}
                placeholder={`Certificate #${index + 1}`}
              />
            ))}
          </View>
          <View className="flex-col gap-4">
            <Text className="text-primary font-bold text-xl">Skills</Text>
            <View className="flex-row gap-4 flex-wrap">
              {skillsOptions.map((skill) => (
                <TouchableOpacity
                  key={skill}
                  onPress={() => toggleSkill(skill)}
                >
                  <LinearGradient
                    colors={
                      selectedSkills.includes(skill)
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
                        selectedSkills.includes(skill)
                          ? "text-white"
                          : "text-black"
                      }
                    >
                      {skill}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <PrimaryButton text="Submit" />
        </View>
      )}
    </Formik>
  );
}

export default ExperienceDetailsScreen;
