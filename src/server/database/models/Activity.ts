import { ImageSourcePropType } from "react-native";

interface Category {
  id: string;
  name: string;
}

interface Activity {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  image: ImageSourcePropType | undefined;
}

export type { Category, Activity };
