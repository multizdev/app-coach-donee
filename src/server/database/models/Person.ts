// @server/database/models/Person.ts

interface Person {
  id: string;
  fullName: string;
  displayName?: string;
  email: string;
  gender: "male" | "female";
  phoneNumber?: string;
  fcmToken?: string;
  photoURL?: string;
}

export default Person;
