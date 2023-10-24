import { Request, Response } from "express";
import { IAuthUserParams } from "./protocols";
import { PostgresAuthUserRepository } from "../../../repositories/User/auth-user/postgres-auth-user";
import { isValidEmail } from "../../../Helpers/EmailIsValid";

export class AuthUserController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<IAuthUserParams | string>> {
    try {
      const { email, password } = httpRequest.body!;

      isValidEmail(email);

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
