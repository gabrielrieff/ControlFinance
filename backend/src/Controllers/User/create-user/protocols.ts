import { enumUser } from "~/Enums/EnumAdmin";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: enumUser;
}
