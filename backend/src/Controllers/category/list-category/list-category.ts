import { Request, Response } from "express";
import { Category } from "~/models/category";
import { ListCategoryRepository } from "~/repositories/category/list-category/postgres-list-category";

export class ListCategoryController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Array<Category> | string>> {
    try {
      const listCategoryRepository = new ListCategoryRepository();
      const listCategory = await listCategoryRepository.listCategory();

      return httpResponse.status(200).json(listCategory);
    } catch (error) {
      if (error != "") {
        return httpResponse.status(400).json({ error: error.message });
      } else {
        return httpResponse
          .status(500)
          .json({ error: "Unable to access category list" });
      }
    }
  }
}
