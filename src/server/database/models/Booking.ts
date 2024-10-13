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
  selectedPackage: Package;
  date: Date;
  // Non-Database Field
  trainer?: Trainer;
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
  selectedPackage: Package;
  originalBookingDate: Date;
};

export { ScheduledDate, Booking, TransformedBooking };
