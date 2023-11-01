import { CreateUserParams } from "~/Controllers/User/create-user/protocols";
import client from "~/database/postgres";
import { User } from "~/models/user";

export class PostgresCreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const userAlreadyExist = await client.user.findFirst({
      where: {
        email: params.email,
      },
    });

    if (userAlreadyExist) {
      throw new Error("User already exist!");
    }

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

    const userCreated = await client.user.findFirst({
      where: { id },
    });

    if (!userCreated) {
      throw new Error("User not created!");
    }

    return user;
  }
}
