import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../commonProtocols";

export interface UpdateUserparams {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  admin?: string;
  updated_at: Date;
}

export interface IUpdateUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUsersRepository {
  updateUsers(id: string, params: UpdateUserparams): Promise<User>;
}
