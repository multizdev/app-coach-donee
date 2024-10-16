import Trainer from "@server/database/models/Trainer";

import User from "@server/database/models/User";

interface ChatMessage {
  sender: string;
  message: string;
  date: Date;
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
