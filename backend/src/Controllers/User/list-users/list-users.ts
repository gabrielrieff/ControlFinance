import { Request, Response } from "express";
import { User } from "~/models/user";
import { ListUsersRepository } from "~/repositories/User/list-users/postgres-list-users";

export class ListUsersController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Array<User> | string>> {
    try {
      const listUserRepository = new ListUsersRepository();
      const detailUser = await listUserRepository.listUsers();

      return httpResponse.status(200).json(detailUser);
    } catch (error) {
      return httpResponse.status(500).json(error);
    }
  }
}
