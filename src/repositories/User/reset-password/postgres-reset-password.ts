import { ResetPasswordParams } from "../../../Controllers/User/reset-password/protocols";
import { hashPassword } from "../../../Helpers/HashPassword";
import client from "../../../database/postgres";
import { User } from "../../../models/user";

export class postgresResetPasswordRepository {
  async ResetPassword(params: ResetPasswordParams): Promise<User | string> {
    try {
      const user = await client.user.findFirst({
        where: {
          id: params.userId,
        },
      });

      if (!user) {
        throw new Error("User not exist");
      }

      const hash = await hashPassword(params.password);

      const userUpdate = await client.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hash,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: true,
          admin: true,
        },
      });

      return userUpdate;
    } catch (error) {
      throw new Error("error User not exist");
    }
  }
}
