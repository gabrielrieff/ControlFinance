import { Request, Response } from "express";
import { Category } from "~/models/category";
import { PostgresCreateCategoryRepository } from "~/repositories/category/create-category/postgres-create-category";

export class CreateCategoryController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Category | string>> {
    try {
      const requiredFields = ["title"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof Category]?.length) {
          return httpResponse
            .status(400)
            .json({ error: `Fields ${field} is required!` });
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
      if (error != "") {
        return httpResponse.status(400).json({ error: error.message });
      } else {
        return httpResponse
          .status(500)
          .json({ error: "Error when trying to create a new category" });
      }
    }
  }
}
