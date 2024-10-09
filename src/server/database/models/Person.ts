// @server/database/models/Person.ts

interface Person {
  id: string;
  fullName: string;
  displayName?: string;
  email: string;
  phoneNumber?: string;
  fcmToken?: string;
}

export default Person;
