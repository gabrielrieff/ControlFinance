import { Request, Response } from "express";
import { enumUser } from "~/Enums/EnumAdmin";
import { isValidEmail } from "~/Helpers/emailIsValid";
import { hashPassword } from "~/Helpers/hashPassword";
import { User } from "~/models/user";
import { PostgresCreateUserRepository } from "~/repositories/User/create-user/postgres-user";
import { CreateUserParams } from "./protocols";

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
        const fieldValue = httpRequest?.body?.[field as keyof CreateUserParams];

        if (
          field === "admin" &&
          fieldValue !== undefined &&
          !(fieldValue in enumUser)
        ) {
          return httpResponse
            .status(400)
            .json({ error: `Invalid value for field ${field}!` });
        }

        if (!fieldValue?.toString().length) {
          return httpResponse
            .status(400)
            .json({ error: `Field ${field} is required!` });
        }
      }

      isValidEmail(email);

      const passwordHash = await hashPassword(password);

      httpRequest.body!.password = passwordHash;

      console.log();
      const postgresCreateUserRepository = new PostgresCreateUserRepository();

      const user = await postgresCreateUserRepository.createUser({
        firstName,
        lastName,
        email,
        password: httpRequest.body!.password,
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
