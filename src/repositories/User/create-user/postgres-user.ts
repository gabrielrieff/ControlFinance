import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../../Controllers/User/create-user/protocols";
import client from "../../../database/postgres";
import { User } from "../../../models/user";

export class PostgresCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const user = await client.user.create({
      data: params,
      select: {
        id: true,
        firstName: true,
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
