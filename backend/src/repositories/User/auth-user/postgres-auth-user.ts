import { compare } from "bcryptjs";
import {
  AuthUserParams,
  IAuthUserParams,
} from "~/Controllers/User/auth-user/protocols";
import client from "~/database/postgres";
import { sign } from "jsonwebtoken";

export class PostgresAuthUserRepository {
  async authUser(params: AuthUserParams): Promise<IAuthUserParams> {
    const user = await client.user.findFirst({
      where: { email: params.email },
      select: {
        id: true,
        firstName: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("User/password incorrect");
    }

    const passwordMatch = await compare(params.password, user.password);

    if (!passwordMatch) {
      throw new Error("User/password incorrect");
    }

    const token = sign(
      {
        name: user.firstName,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      ...user,
      token: token,
    };
  }
}
