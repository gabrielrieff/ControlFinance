import {
  CreateUSerParams,
  ICreateUsersRepository,
} from "../../Controllers/create-user/protocols";
import client from "../../database/postgres";
import { User } from "../../models/user";

export class PostgresCreateUser implements ICreateUsersRepository {
  async createUsers(params: CreateUSerParams): Promise<User> {
    const user = await client.user.create({
      data: params,
      select: {
        id: true,
        firtsName: true,
        lastName: true,
        email: true,
        password: true,
        admin: true,
      },
    });
    const { id } = user;

    const userAlreadyExist = await client.user.findFirst({
      where: { id },
    });

    if (!userAlreadyExist) {
      throw new Error("User not created!");
    }

    return user;
  }
}
