// @server/database/models/Trainer.ts

import { Package } from "@server/database/models/Package";
import Person from "@server/database/models/Person";

interface Trainer extends Person {
  access: boolean;
  status: "active" | "break" | "holiday";
  experience: string | null;
  session: number | null;
  rating: number | null;
  certificates: string[];
  services: string[];
  packages?: Package[];
}

export default Trainer;
