import { Request, Response } from "express";
import { PostgresToRecoverPassword } from "../../../repositories/User/to-recover-user/postgrest-to-recover-password";
import { isValidEmail } from "../../../Helpers/EmailIsValid";

export class ToRecoverPassword {
  async handle(httpRequest: Request, httpResponse: Response) {
    const { password, token, email } = httpRequest.body;

    isValidEmail(email);

    const postgresToRecoverPassword = new PostgresToRecoverPassword();

    const user = await postgresToRecoverPassword.RecoverPassword({
      email,
      password,
      token,
    });

    return httpResponse.json(user);
  }
}
