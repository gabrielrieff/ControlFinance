import client from "~/database/postgres";

export class DetailUserRepository {
  async detailUser(id: string) {
    const detailUser = await client.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        userType: true,
        firstName: true,
        lastName: true,
        photo: true,
        email: true,
        updated_at: true,
        created_at: true,
      },
    });

    const sumArray = await client.invoice.findMany({
      where: {
        userId: id,
      },
      select: {
        value: true,
        type: true,
      },
    });

    let sum: number = 0;
    let revenue: number = 0;
    let expense: number = 0;

    if (sumArray.length > 0) {
      for (let i = 0; i < sumArray.length; i++) {
        sum += sumArray[i].value;

        if (sumArray[i].type === 0) {
          revenue += sumArray[i].value;
        } else {
          expense += sumArray[i].value;
        }
      }
    }

    if (!detailUser) {
      throw new Error("User not exist");
    }

    const user = { ...detailUser, revenue, expense, sum };

    return user;
  }
}
