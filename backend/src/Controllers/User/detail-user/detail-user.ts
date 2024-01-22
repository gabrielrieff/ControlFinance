import { Request, Response } from "express";
import { User } from "~/models/user";
import { DetailUserRepository } from "~/repositories/User/detail-user/detail-user";

export class DetailUserController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<User | string>> {
    try {
      const { year, month } = httpRequest.query;
      const id = httpRequest.user_id;

      const yearConverted = parseInt(year as string, 10);
      const monthConverted = parseInt(month as string, 10);

      const monthZeroBased = monthConverted - 1;
      const startDate = new Date(yearConverted, monthZeroBased, 1);
      const endDate = new Date(yearConverted, monthZeroBased + 1, 1);

      const detailUserRepository = new DetailUserRepository();
      const detailUser = await detailUserRepository.detailUser(
        id,
        startDate,
        endDate
      );

      return httpResponse.status(200).json(detailUser);
    } catch (error) {
      return httpResponse.status(500).json(error);
    }
  }
}
