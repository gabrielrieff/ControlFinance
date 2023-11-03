import { Request, Response } from "express";
import { User } from "~/models/user";
import { PostgresUpdateUserRepository } from "~/repositories/User/update-user/postgres-update-user";
import { UpdateUserparams } from "./protocols";

export class UpdateUserController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<User | string>> {
    try {
      const id = httpRequest?.params?.id as string;
      const photo = httpRequest.file.filename;
      const body = { ...httpRequest.body, photo };

      if (!id) {
        return httpResponse.status(401).json({ error: "Missing user id" });
      }

      const allowedFieldToUpdat: (keyof UpdateUserparams)[] = [
        "firstName",
        "lastName",
        "email",
        "photo",
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
