import { Request, Response } from "express";
import validator from "validator";
import { PostgresToForgotPasswordRepository } from "../../../repositories/User/to-forgot-password/postgres-to-forgot-password";

export class ToForgotPassword {
  async handle(httpRequest: Request, httpResponse: Response) {
    const { email } = httpRequest.body;

    const emailIsValid = validator.isEmail(email);

    if (!emailIsValid) {
      throw new Error("E-mail is invalid");
    }

    const toForgotPasswordRepository = new PostgresToForgotPasswordRepository();

    const forgotPassword =
      await toForgotPasswordRepository.forgotPassword(email);

    return httpResponse.send();
  }
}
