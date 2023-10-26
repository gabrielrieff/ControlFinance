import { User } from "../../../models/user";

export interface IGetUsersRepository {
  getUsers(user_id: string): Promise<User[]>;
}
