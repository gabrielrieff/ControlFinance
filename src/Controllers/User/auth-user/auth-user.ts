import { Request, Response } from "express";
import validator from "validator";
import { IAuthUserParams } from "./protocols";
import { PostgresAuthUserRepository } from "../../../repositories/User/auth-user/postgres-auth-user";

export class AuthUserController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<IAuthUserParams | string>> {
    try {
      const emailIsValid = validator.isEmail(httpRequest.body.email);

      if (!emailIsValid) {
        throw new Error("E-mail is invalid");
      }
      const postgresAuthUserRepository = new PostgresAuthUserRepository();

      const user = await postgresAuthUserRepository.authUser(httpRequest.body!);

      return httpResponse.json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
