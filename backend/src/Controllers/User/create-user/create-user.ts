import { Request, Response } from "express";
import { User } from "../../../models/user";
import { CreateUserParams } from "./protocols";
import { PostgresCreateUserRepository } from "../../../repositories/User/create-user/postgres-user";
import { isValidEmail } from "../../../Helpers/emailIsValid";
import { hashPassword } from "../../../Helpers/hashPassword";

export class CreateUserController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<User | string>> {
    try {
      const { firstName, lastName, email, password, admin } = httpRequest.body;

      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "password",
        "admin",
      ];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return httpResponse
            .status(400)
            .json({ error: `Fields ${field} is required!` });
        }
      }

      isValidEmail(email);

      const passwordHash = await hashPassword(password);

      httpRequest.body!.password = passwordHash;

      const postgresCreateUserRepository = new PostgresCreateUserRepository();

      const user = await postgresCreateUserRepository.createUser({
        firstName,
        lastName,
        email,
        password,
        admin,
      });

      return httpResponse.status(201).json(user);
    } catch (error) {
      if (error != "") {
        return httpResponse.status(400).json({ error: error.message });
      } else {
        return httpResponse
          .status(500)
          .json({ error: "Error when trying to create a new user" });
      }
    }
  }
}
