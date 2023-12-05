import { resolve } from "path";
import { UpdateUserparams } from "~/Controllers/User/update-user/protocols";
import client from "~/database/postgres";

import { deletePhoto } from "~/Helpers/deletePhoto";
import { User } from "~/models/user";

export class PostgresUpdateUserRepository {
  async updateUsers(id: string, params: UpdateUserparams): Promise<User> {
    const user = await client.user.findFirst({
      where: {
        id: id,
      },
    });

    await client.user.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });

    if (params.photo || (user.photo !== null && params.photo)) {
      const folder = "./tmp/image/user";
      const image = user.photo;

      const filePath = resolve(
        __dirname,
        "../",
        "../",
        "../",
        "../",
        folder,
        image
      );

      await deletePhoto(filePath);
    }

    const isUser = await client.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        photo: true,
        password: true,
        userType: true,
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
