import { hash } from "bcryptjs";
import client from "../../../database/postgres";

interface IRecoverPassword {
  email: string;
  password: string;
  token: string;
}

export class PostgresToRecoverPasswordRepository {
  async RecoverPassword(params: IRecoverPassword) {
    try {
      const passwordHash = await hash(params.password, 8);
      const now = new Date();

      const user = await client.user.findFirst({
        where: {
          email: params.email,
        },
        select: {
          passwordResetExpired: true,
          passwordResetToken: true,
        },
      });

      if (!user) {
        throw new Error("User not exist");
      }

      if (user.passwordResetToken != params.token) {
        throw new Error("Token invalid");
      }

      if (now > user.passwordResetExpired) {
        throw new Error("Token expired, generate a new one");
      }

      const userRecover = await client.user.updateMany({
        where: {
          email: params.email,
        },
        data: {
          password: passwordHash,
        },
      });

      return userRecover;
    } catch (error) {
      throw new Error("error User not exist");
    }
  }
}
