import { enumUser } from "~/Enums/EnumAdmin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  photo?: string;
  email: string;
  password: string;
  userType: enumUser;
  revenue?: number;
  expense?: number;
  sum?: number;
}
