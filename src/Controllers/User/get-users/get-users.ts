import { serverError } from "../../../Helpers/requestHelper";
import { Request, Response } from "express";
import { PostgresGetUsersRepository } from "../../../repositories/User/get-users/postgres-get-user";

export class GetUsersController {
  async handle(httpRequest: Request, httpResponse: Response) {
    try {
      const postgresGetUsersRepository = new PostgresGetUsersRepository();

      const users = await postgresGetUsersRepository.getUsers(
        httpRequest.user_id
      );
      return httpResponse.json(users);
    } catch (error) {
      return serverError();
    }
  }
}
