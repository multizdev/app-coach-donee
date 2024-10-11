import Trainer from "@server/database/models/Trainer";
import { Package } from "@server/database/models/Package";

type ScheduledDate = {
  date: string;
  time: string;
};

interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  trainerId: string;
  userId: string;
  scheduledDates: ScheduledDate[];
  package: Package;
  // Non-Database Field
  trainer?: Trainer;
}

export { ScheduledDate, Booking };
