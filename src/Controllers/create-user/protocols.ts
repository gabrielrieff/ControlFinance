import { User } from "../../models/user";
import { HttpResponse } from "../commonProtocols";

export interface CreateUSerParams {
  firtsName: string;
  lastName: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface ICreateUserController {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface ICreateUsersRepository {
  createUsers(params: CreateUSerParams): Promise<User>;
}
