import client from "../../database/postgres";
import { Category } from "../../models/category";

export class PostgresCreateCategoryRepository {
  async createInovocieRepository(params: Category) {
    const existingCategory = await client.category.findFirst({
      where: {
        title: params.title,
      },
    });

    if (existingCategory) {
      throw new Error("Categoria ja existente");
    }

    const createdCategory = await client.category.create({
      data: {
        title: params.title,
      },
      select: {
        id: true,
        title: true,
      },
    });

    return createdCategory;
  }
}
