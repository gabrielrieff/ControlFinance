import client from "~/database/postgres";
import { User } from "~/models/user";

export class PostgresDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await client.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not exist");
    }

    const { count } = await client.user.deleteMany({
      where: {
        id: id,
      },
    });

    if (!count) {
      throw new Error("User not deleted");
    }

    return user!;
  }
}
