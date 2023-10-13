import { ok, serverError } from "../../Helpers/requestHelper";
import { IController } from "../protocolsUser";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUserRepository: IGetUsersRepository) {}

  async handle() {
    try {
      const users = await this.getUserRepository.getUsers();
      return ok(users);
    } catch (error) {
      return serverError();
    }
  }
}
