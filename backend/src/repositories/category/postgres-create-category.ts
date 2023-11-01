import { Response } from "express";
import client from "../../database/postgres";
import { Category } from "../../models/category";

export class PostgresCreateCategoryRepository {
  async createInovocieRepository(
    params: Category
  ): Promise<Category | Response<string>> {
    const existingCategory = await client.category.findFirst({
      where: {
        title: params.title,
      },
    });

    if (existingCategory) {
      throw new Error("Existing category!");
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
