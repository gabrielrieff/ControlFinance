import { Request, Response } from "express";
import { PostgresToForgotPasswordRepository } from "~/repositories/User/to-forgot-password/postgres-to-forgot-password";
import { isValidEmail } from "~/Helpers/emailIsValid";

export class ToForgotPasswordController {
  async handle(httpRequest: Request, httpResponse: Response) {
    try {
      const { email } = httpRequest.body;

      isValidEmail(email);

      const toForgotPasswordRepository =
        new PostgresToForgotPasswordRepository();

      const forgotPassword =
        await toForgotPasswordRepository.forgotPassword(email);

      return httpResponse.send();
    } catch (error) {
      return httpResponse.status(500).json(error);
    }
  }
}
