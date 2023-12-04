import client from "~/database/postgres";
import { User } from "~/models/user";

export class ListUsersRepository {
  async listUsers(): Promise<Array<User> | string> {
    try {
      const response = await client.user.findMany();

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
