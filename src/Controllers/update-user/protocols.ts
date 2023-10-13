import { User } from "../../models/user";
//import { HttpResponse } from "../commonProtocols";

export interface UpdateUserparams {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  admin?: string;
  updated_at: Date;
}

// export interface IUpdateUserController {
//   handle(): Promise<HttpResponse<User[]>>;
// }

export interface IUpdateUsersRepository {
  updateUsers(id: string, params: UpdateUserparams): Promise<User>;
}
