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
        return httpResponse.status(401).json({ error: "Missing user id" });
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
        return httpResponse
          .status(400)
          .json({ error: "Some received field is not allowed" });
      }

      const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

      const user = await postgresUpdateUserRepository.updateUsers(id, body!);

      return httpResponse.json(user);
    } catch (error) {
      if (error != "") {
        return httpResponse.status(400).json({ error: error.message });
      } else {
        return httpResponse
          .status(500)
          .json({ error: "Error when trying to change user data" });
      }
    }
  }
}
