import { Request, Response } from "express";
import { Invoice } from "~/models/inovoice";
import { FilterListCategoryRepository } from "~/repositories/category/filter-list-category/filterListCategory";
import { filterCategory } from "./protocols";

export class FilterListCategoryController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Array<Invoice> | string>> {
    try {
      const title = httpRequest.params.id as string;
      const userId = httpRequest.user_id;

      const data = {
        title,
        userId,
      } as filterCategory;

      const filterListCategoryRepository = new FilterListCategoryRepository();
      const filterListCategory =
        await filterListCategoryRepository.filterListCategory(data);

      return httpResponse.status(200).json(filterListCategory);
    } catch (error) {
      if (error != "") {
        return httpResponse.status(400).json({ error: error.message });
      } else {
        return httpResponse
          .status(500)
          .json({ error: "Unable to access this category filter" });
      }
    }
  }
}
