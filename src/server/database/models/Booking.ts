import Trainer from "@server/database/models/Trainer";
import { Package } from "@server/database/models/Package";
import User from "@server/database/models/User";

type ScheduledDate = {
  date: string;
  time: string;
  status: string | undefined;
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
  status: string | undefined;
  selectedPackage: Package;
  originalBookingDate: Date;
  bookingIndex?: number;
};

export { ScheduledDate, Booking, TransformedBooking };
