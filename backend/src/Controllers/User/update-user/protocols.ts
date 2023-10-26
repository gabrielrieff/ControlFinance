import { User } from "../../../models/user";

export interface UpdateUserparams {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  admin?: string;
  updated_at: Date;
}

export interface IUpdateUsersRepository {
  updateUsers(id: string, params: UpdateUserparams): Promise<User>;
}
