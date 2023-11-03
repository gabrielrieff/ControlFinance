import client from "~/database/postgres";

export class DetailUserRepository {
  async detailUser(id: string) {
    const detailUser = await client.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        admin: true,
        firstName: true,
        lastName: true,
        email: true,
        updated_at: true,
        created_at: true,
      },
    });

    if (!detailUser) {
      throw new Error("User not exist");
    }

    return detailUser;
  }
}
