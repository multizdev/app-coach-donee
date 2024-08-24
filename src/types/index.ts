import { ImageSourcePropType } from "react-native";

type Activity = {
  name: string;
  background: string;
  image: ImageSourcePropType | undefined;
  category: string;
};

export type { Activity };
