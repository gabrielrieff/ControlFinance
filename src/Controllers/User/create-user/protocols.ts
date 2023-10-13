import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../commonProtocols";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  admin: string;
}

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
