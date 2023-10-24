import { Request, Response } from "express";
import { User } from "../../../models/user";
import { CreateUserParams } from "./protocols";
import validator from "validator";
import { hash } from "bcryptjs";
import { PostgresCreateUserRepository } from "../../../repositories/User/create-user/postgres-user";

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
          throw new Error(`Fields ${field} is required!`);
        }
      }

      const emailIsValid = validator.isEmail(email);

      if (!emailIsValid) {
        throw new Error("E-mail is invalid");
      }

      const passwordHash = await hash(password, 8);

      httpRequest.body!.password = passwordHash;

      const postgresCreateUserRepository = new PostgresCreateUserRepository();

      const user = await postgresCreateUserRepository.createUser({
        firstName,
        lastName,
        email,
        password,
        admin,
      });

      return httpResponse.json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
