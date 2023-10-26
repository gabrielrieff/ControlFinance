import { Request, Response } from "express";
import { User } from "../../../models/user";
import { UpdateUserparams } from "./protocols";
import { PostgresUpdateUserRepository } from "../../../repositories/User/update-user/postgres-update-user";

export class UpdateUserController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<User | string>> {
    try {
      const id = httpRequest?.params?.id as string;
      const body = httpRequest?.body;

      if (!id) {
        throw new Error("Missing user id");
      }

      const allowedFieldToUpdat: (keyof UpdateUserparams)[] = [
        "firstName",
        "lastName",
        "email",
        "password",
        "admin",
        "updated_at",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(
        (field) =>
          !allowedFieldToUpdat.includes(field as keyof UpdateUserparams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        throw new Error("Some received field is not allowed");
      }

      const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

      const user = await postgresUpdateUserRepository.updateUsers(id, body!);

      return httpResponse.json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
