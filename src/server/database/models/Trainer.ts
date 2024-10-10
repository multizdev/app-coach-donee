// @server/database/models/Trainer.ts

import { Package } from "@server/database/models/Package";
import Person from "@server/database/models/Person";
import { DaysTime } from "@src/types";

interface Trainer extends Person {
  access: boolean;
  status: "active" | "break" | "holiday";
  awayMode: { startDate: string; endDate: string } | null;
  experience: string | null;
  session: number | null;
  rating: number | null;
  certificates: string[];
  services: string[];
  packages?: Package[];
  schedule: DaysTime | undefined;
}

export default Trainer;
