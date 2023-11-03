import { Request, Response } from "express";
import { User } from "~/models/user";
import { DetailUserRepository } from "~/repositories/User/detail-user/detail-user";

export class DetailUserController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<User | string>> {
    try {
      const id = httpRequest.user_id;
      const detailUserRepository = new DetailUserRepository();
      const detailUser = await detailUserRepository.detailUser(id);

      return httpResponse.status(200).json(detailUser);
    } catch (error) {
      return httpResponse.status(500).json(error);
    }
  }
}
