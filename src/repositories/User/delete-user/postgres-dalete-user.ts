import { IDeleteUserRepository } from "../../../Controllers/User/delete-user/Protocols";
import client from "../../../database/postgres";
import { User } from "../../../models/user";

export class PostgresDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await client.user.findFirst({
      where: {
        id: id,
      },
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
