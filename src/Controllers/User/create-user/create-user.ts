import validator from "validator";
import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../commonProtocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { IController } from "../protocolsUser";
import { BadRequest, created, serverError } from "../../Helpers/requestHelper";
import { hash } from "bcryptjs";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "password",
        "admin",
      ];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return BadRequest(`Fields ${field} is required!`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return BadRequest("E-mail is invalid");
      }

      const passwordHash = await hash(httpRequest.body!.password, 8);

      httpRequest.body!.password = passwordHash;

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created(user);
    } catch (error) {
      return serverError();
    }
  }
}
