import { IGetUsersRepository } from "../../Controllers/get-users/protocols";
import client from "../../database/postgres";
import { User } from "../../models/user";

export class PostgresGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const Users = await client.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        admin: true,
        created_at: true,
      },
    });

    return Users.map(({ id, ...rest }) => ({
      ...rest,
      id: id.toString(),
    }));
  }
}
