import { User } from "../../../models/user";
import { Request, Response } from "express";
import { PostgresDeleteUserRepository } from "../../../repositories/User/delete-user/postgres-dalete-user";

export class deleteUserController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<User | string>> {
    try {
      const id = httpRequest.params.id as string;

      if (!id) {
        throw new Error("Missing user id");
      }

      const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

      const user = await postgresDeleteUserRepository.deleteUser(id);

      return httpResponse.json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
