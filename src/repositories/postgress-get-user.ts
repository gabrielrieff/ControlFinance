import { IGetUsersRepository } from "../Controllers/get-users/protocols";
import client from "../database/postgres";
import { User } from "../models/user";

export class PostgresGetUsers implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {

    const users = await client.

    return [
      {
        firtsName: "John",
        lastName: "Doe",
        email: "John@gmail.com",
        password: "<PASSWORD>",
        admin: true,
      },
    ];
  }
}
