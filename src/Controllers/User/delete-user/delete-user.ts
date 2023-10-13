import { User } from "../../../models/user";
import { BadRequest, ok, serverError } from "../../Helpers/requestHelper";
import { HttpRequest, HttpResponse } from "../../commonProtocols";
import { IController } from "../protocolsUser";
import { IDeleteUserRepository } from "./Protocols";

export class deleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return BadRequest("Missing user id");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
