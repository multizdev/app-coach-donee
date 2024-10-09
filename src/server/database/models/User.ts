// @server/database/models/User.ts

import Person from "@server/database/models/Person";

interface User extends Person {
  access: boolean;
}

export default User;
