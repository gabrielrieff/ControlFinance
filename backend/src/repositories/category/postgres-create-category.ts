import client from "../../database/postgres";
import { Category } from "../../models/category";

export class PostgresCreateCategoryRepository {
  async createInovocieRepository(params: Category) {
    const user = await client.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    if (!user) {
      throw new Error("User not exist");
    }

    const createdCategory = await client.category.create({
      data: {
        title: params.title,
      },
      select: {
        id: true,
      },
    });

    return createdCategory;
  }
}
