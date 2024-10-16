import Trainer from "@server/database/models/Trainer";

import User from "@server/database/models/User";
import { Timestamp } from "@react-native-firebase/firestore";

interface ChatMessage {
  sender: "user" | "trainer";
  message: string;
  date: Timestamp;
}

interface Chat {
  id: string;
  userId: string;
  trainerId: string;
  messages: ChatMessage[];
  // Undefined values
  trainer?: Trainer;
  user?: User;
}

export type { Chat, ChatMessage };
