import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";

import { Avatar } from "react-native-paper";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import TextInputField from "@src/modules/common/components/input/TextInputField";
import { MaterialIcons } from "@expo/vector-icons";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useAppStore from "@src/modules/common/stores/useAppStore";
import User from "@server/database/models/User";
import Trainer from "@server/database/models/Trainer";

const updateSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  displayName: Yup.string().required("Display Name is required"),
  gender: Yup.string().oneOf(
    ["male", "female"],
    "Gender must be either 'male' or 'female'",
  ),
});

function UpdateUserForm() {
  let user: User | Trainer | null = null;
  let type: string | null;

  const {
    detailedTrainer,
    detailedUser,
    user: firebaseUser,
    setDetailedTrainer,
    setDetailedUser,
  } = useAppStore();

  if (detailedUser) {
    user = detailedUser as User;
    type = "Users";
  } else if (detailedTrainer) {
    user = detailedTrainer as Trainer;
    type = "Trainers";
  }

  async function updateUserInFirestore(values: any) {
    if (type) {
      const updatedValues = {
        gender: values.gender,
        fullName: values.fullName,
        displayName: values.displayName,
      };

      const doc = firestore().collection(type).doc(firebaseUser?.uid);
      await doc.update(updatedValues);

      await auth().currentUser?.updateProfile({
        displayName: values.displayName,
      });

      if (type === "Trainers") {
        setDetailedTrainer({
          ...detailedTrainer!,
          ...updatedValues,
        });
      } else if (type === "Users") {
        setDetailedUser({
          ...detailedUser!,
          ...updatedValues,
        });
      }
    }
  }

  if (user) {
    return (
      <View className="flex-1 bg-white pt-6">
        <View className="flex-col items-center gap-4 mb-4">
          <Avatar.Image
            size={100}
            source={require("@assets/activities/gym.webp")}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            className="h-[30] flex justify-center items-center"
          >
            <LinearGradient
              colors={["#60A5FA", "#98d3ff"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{ elevation: 4 }}
              className={`w-full h-full px-8 flex-1 items-center justify-center rounded-full overflow-hidden`}
            >
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="edit" size={18} color="white" />
                <Text className={`text-white`}>Update Picture</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={{
            fullName: user.fullName || "",
            displayName: user.displayName || "",
            gender: user.gender || "",
          }}
          validationSchema={updateSchema}
          onSubmit={async (values) => {
            try {
              await updateUserInFirestore(values);
            } catch (error) {
              console.error("Failed to update user:", error);
            }
          }}
        >
          {({ handleSubmit, setFieldValue, values, errors, touched }) => (
            <View className="flex-1 bg-white p-4 gap-6">
              <TextInputField name="fullName" placeholder="Full Name" />
              <TextInputField name="displayName" placeholder="Display Name" />

              <View className="flex-row items-center gap-4 mb-4">
                <LinearGradient
                  colors={
                    values.gender === "male"
                      ? ["#60A5FA", "#98d3ff"]
                      : ["#fff", "#fff"]
                  }
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={{ elevation: 4 }}
                  className={`h-[40] ${
                    values.gender === "male" ? "" : "border-gray-400"
                  } flex-1 items-center justify-center rounded-full overflow-hidden`}
                >
                  <TouchableOpacity
                    className="w-full h-full flex justify-center items-center"
                    onPress={() => setFieldValue("gender", "male")}
                  >
                    <Text
                      className={`${
                        values.gender === "male"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  colors={
                    values.gender === "female"
                      ? ["#60A5FA", "#98d3ff"]
                      : ["#fff", "#fff"]
                  }
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={{ elevation: 4 }}
                  className={`h-[40] ${
                    values.gender === "female" ? "" : "border-gray-400"
                  } flex-1 items-center justify-center rounded-full overflow-hidden`}
                >
                  <TouchableOpacity
                    className="w-full h-full flex justify-center items-center"
                    onPress={() => setFieldValue("gender", "female")}
                  >
                    <Text
                      className={`${
                        values.gender === "female"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              {touched.gender && errors.gender && (
                <Text className="text-red-500">{errors.gender}</Text>
              )}
              <PrimaryButton text="Update" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    );
  }
  return null;
}

export default UpdateUserForm;
