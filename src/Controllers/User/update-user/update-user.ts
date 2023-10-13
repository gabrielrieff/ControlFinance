import { User } from "../../../models/user";
import { BadRequest, ok, serverError } from "../../Helpers/requestHelper";
import { HttpRequest, HttpResponse } from "../../commonProtocols";
import { IController } from "../protocolsUser";
import { IUpdateUsersRepository, UpdateUserparams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUsersRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserparams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return BadRequest("Missing user id");
      }

      const allowedFieldToUpdat: (keyof UpdateUserparams)[] = [
        "firstName",
        "lastName",
        "email",
        "password",
        "admin",
        "updated_at",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(
        (field) =>
          !allowedFieldToUpdat.includes(field as keyof UpdateUserparams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return BadRequest("Some received field is not allowed");
      }

      const user = await this.updateUserRepository.updateUsers(id, body!);

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
