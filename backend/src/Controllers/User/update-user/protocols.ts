import { User } from "../../../models/user";

export interface UpdateUserparams {
  firstName?: string;
  lastName?: string;
  email?: string;
  photo?: string;
  password?: string;
  admin?: number;
  updated_at: Date;
}

export interface IUpdateUsersRepository {
  updateUsers(id: string, params: UpdateUserparams): Promise<User>;
}
