import { Request, Response } from "express";
import { Category } from "~/models/category";
import { DeleteCategoryRepository } from "~/repositories/category/delete-category/postgres-delete-category";

export class DeleteCategoryController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Category | string>> {
    try {
      const id = httpRequest.params.id as string;
      const userId = httpRequest.user_id as string;

      if (!id) {
        return httpResponse.status(401).json({ error: "Missing user id" });
      }

      const deleteCategoryRepository = new DeleteCategoryRepository();
      const deleteCategori = await deleteCategoryRepository.deleteCategory(
        id,
        userId
      );

      return httpResponse.json(deleteCategori);
    } catch (error) {
      if (error != "") {
        return httpResponse.status(400).json({ error: error.message });
      } else {
        return httpResponse
          .status(500)
          .json({ error: "Error when trying to change your categori" });
      }
    }
  }
}
