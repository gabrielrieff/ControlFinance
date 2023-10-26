import client from "../../../database/postgres";
import { User } from "../../../models/user";

export class PostgresGetUsersRepository {
  async getUsers(user_id: string): Promise<User[]> {
    const user = await client.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new Error("User not exist");
    }

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
