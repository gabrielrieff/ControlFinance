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
      const { email, password } = httpRequest.body!;

      const emailIsValid = validator.isEmail(email);

      if (!emailIsValid) {
        throw new Error("E-mail is invalid");
      }
      const postgresAuthUserRepository = new PostgresAuthUserRepository();

      const user = await postgresAuthUserRepository.authUser({
        email,
        password,
      });

      return httpResponse.json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
