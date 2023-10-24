import { Request, Response } from "express";
import { PostgresToForgotPasswordRepository } from "../../../repositories/User/to-forgot-password/postgres-to-forgot-password";
import { isValidEmail } from "../../../Helpers/EmailIsValid";

export class ToForgotPassword {
  async handle(httpRequest: Request, httpResponse: Response) {
    const { email } = httpRequest.body;

    isValidEmail(email);

    const toForgotPasswordRepository = new PostgresToForgotPasswordRepository();

    const forgotPassword =
      await toForgotPasswordRepository.forgotPassword(email);

    return httpResponse.send();
  }
}
