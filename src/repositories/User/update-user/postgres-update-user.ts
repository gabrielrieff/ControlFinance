import {
  IUpdateUsersRepository,
  UpdateUserparams,
} from "../../../Controllers/User/update-user/protocols";
import client from "../../../database/postgres";
import { User } from "../../../models/user";

export class PostgresUpdateUserRepository implements IUpdateUsersRepository {
  async updateUsers(id: string, params: UpdateUserparams): Promise<User> {
    await client.user.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });

    const isUser = await client.user.findFirst({
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
        updated_at: true,
      },
    });

    if (!isUser) {
      throw new Error("User not update");
    }

    return isUser;
  }
}
