import { IGetUsersRepository } from "../Controllers/get-users/protocols";
import { User } from "../models/user";

export class PostgresGetUsers implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
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
