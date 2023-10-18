import validator from "validator";
import { BadRequest, ok, serverError } from "../../Helpers/requestHelper";
import { HttpRequest, HttpResponse } from "../../commonProtocols";
import { IController } from "../protocolsUser";
import {
  AuthUserParams,
  IAuthUserParams,
  IAuthUserRepository,
} from "./protocols";

export class AuthUserController implements IController {
  constructor(private readonly authUserRepository: IAuthUserRepository) {}

  async handle(
    httpRequest: HttpRequest<AuthUserParams>
  ): Promise<HttpResponse<IAuthUserParams | string>> {
    try {
      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsValid) {
        return BadRequest("E-mail is invalid");
      }
      const user = await this.authUserRepository.authUser(httpRequest.body!);

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
