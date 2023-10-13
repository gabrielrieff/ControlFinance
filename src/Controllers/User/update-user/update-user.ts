import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../commonProtocols";
import { IController } from "../protocolsUser";
import { IUpdateUsersRepository, UpdateUserparams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUsersRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserparams>
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
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
        return { statusCode: 400, body: "Some received field is not allowed" };
      }

      const user = await this.updateUserRepository.updateUsers(id, body!);

      return { statusCode: 200, body: user };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
