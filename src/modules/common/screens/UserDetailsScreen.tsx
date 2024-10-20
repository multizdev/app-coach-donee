import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";

import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, Toast } from "@ant-design/react-native";

import TextInputField from "@src/modules/common/components/input/TextInputField";
import PrimaryButton from "@src/modules/common/components/input/PrimaryButton";
import useAppStore from "@src/modules/common/stores/useAppStore";
import User from "@server/database/models/User";
import Trainer from "@server/database/models/Trainer";
import ProfileImage from "@src/modules/common/components/user/ProfileImage";

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

  const [uploading, setUploading] = useState<boolean>(false);

  const {
    detailedTrainer,
    detailedUser,
    user: firebaseUser,
    setDetailedTrainer,
    setDetailedUser,
    setUser,
  } = useAppStore();

  if (detailedUser) {
    user = detailedUser as User;
    type = "Users";
  } else if (detailedTrainer) {
    user = detailedTrainer as Trainer;
    type = "Trainers";
  }

  async function updateUserInFirestore(values: any) {
    try {
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
    } catch (error) {
      if (error instanceof Error) {
        Toast.show("Could not update user details!");
      }
    }
  }

  const pickAndUploadImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && firebaseUser) {
        const imageUri = result.assets[0].uri;

        const ref = storage().ref(`images/${type}/${firebaseUser.uid}.png`);
        const task = ref.putFile(imageUri);

        task.on("state_changed", (taskSnapshot) => {
          if (taskSnapshot.bytesTransferred === 0) setUploading(true);
          if (taskSnapshot.bytesTransferred === taskSnapshot.totalBytes)
            setUploading(false);
        });

        task
          .then(async () => {
            try {
              const downloadURL = await ref.getDownloadURL();
              await firestore()
                .collection(type || "")
                .doc(firebaseUser.uid)
                .update({
                  photoURL: downloadURL,
                });
              await firebaseUser.updateProfile({
                photoURL: downloadURL,
              });
              setUser(auth().currentUser);
            } catch (error) {
              if (error) {
                Toast.show("Error uploading image");
                setUploading(false);
              }
            }
          })
          .catch((error) => {
            if (error) {
              Toast.show("Error uploading image" + error.message);
              setUploading(false);
            }
          });
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.show("Error uploading image" + error.message);
        setUploading(false);
      }
    }
  };

  if (user) {
    return (
      <View className="flex-1 bg-white pt-6">
        <View className="flex-col items-center gap-4 mb-4">
          {uploading ? <ActivityIndicator /> : <ProfileImage />}
          <TouchableOpacity
            activeOpacity={0.6}
            className="h-[30] flex justify-center items-center"
            onPress={pickAndUploadImage}
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
