import { Request, Response } from "express";
import { PostgresToRecoverPasswordRepository } from "~/repositories/User/to-recover-user/postgrest-to-recover-password";
import { isValidEmail } from "~/Helpers/emailIsValid";

export class ToRecoverPasswordController {
  async handle(httpRequest: Request, httpResponse: Response) {
    try {
      const { password, token, email } = httpRequest.body;

      isValidEmail(email);

      const postgresToRecoverPasswordRepository =
        new PostgresToRecoverPasswordRepository();

      const user = await postgresToRecoverPasswordRepository.RecoverPassword({
        email,
        password,
        token,
      });

      return httpResponse.json(user);
    } catch (error) {
      return httpResponse.status(500).json(error);
    }
  }
}
