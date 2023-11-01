import { Request, Response } from "express";
import { User } from "~/models/user";
import { postgresResetPasswordRepository } from "~/repositories/User/reset-password/postgres-reset-password";

export class ResetPasswordController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<User | string>> {
    try {
      const { password } = httpRequest.body;
      const userId = httpRequest.user_id;

      const resetPasswordRepository = new postgresResetPasswordRepository();

      const userUpdate = resetPasswordRepository.ResetPassword({
        password,
        userId,
      });

      return httpResponse.json(userUpdate);
    } catch (error) {
      return httpResponse.status(500).json(error);
    }
  }
}
