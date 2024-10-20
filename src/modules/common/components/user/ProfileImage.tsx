import React from "react";

import { Avatar } from "react-native-paper";

import useAppStore from "@src/modules/common/stores/useAppStore";
import { COLOR_BLUE } from "@src/modules/common/constants";

function ProfileImage() {
  const { user } = useAppStore();

  return (
    <>
      {user && user?.photoURL ? (
        <Avatar.Image
          size={100}
          source={user?.photoURL ? { uri: user?.photoURL } : { uri: "" }}
        />
      ) : (
        <Avatar.Text
          style={{ backgroundColor: COLOR_BLUE }}
          color="white"
          size={100}
          label={user?.displayName!.charAt(0).toUpperCase()!}
        />
      )}
    </>
  );
}

export default ProfileImage;
