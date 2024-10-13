import Trainer from "@server/database/models/Trainer";
import { Package } from "@server/database/models/Package";
import User from "@server/database/models/User";

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
  selectedPackage: Package;
  date: Date;
  status: "complete" | null;
  // Non-Database Field
  trainer?: Trainer;
  user?: User;
}

type TransformedBooking = {
  id: string;
  serviceId: string;
  serviceName: string;
  trainerId: string;
  userId: string;
  date: string;
  time: string;
  trainer?: Trainer;
  user?: User;
  status: "complete" | null;
  selectedPackage: Package;
  originalBookingDate: Date;
};

export { ScheduledDate, Booking, TransformedBooking };
