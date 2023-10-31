import { Request, Response } from "express";
import { Category } from "../../models/category";
import { PostgresCreateCategoryRepository } from "../../repositories/category/postgres-create-category";

export class CreateCategoryController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Category | string>> {
    try {
      const requiredFields = ["title"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof Category]?.length) {
          throw new Error(`Fields ${field} is required!`);
        }
      }

      const { title } = httpRequest.body;
      const userId = httpRequest.user_id;

      const data = {
        title,
        userId,
      } as Category;

      const createCategoryRepository = new PostgresCreateCategoryRepository();
      const category =
        await createCategoryRepository.createInovocieRepository(data);

      return httpResponse.json(category);
    } catch (error) {
      throw new Error(error);
    }
  }
}
