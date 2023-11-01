import { filterCategory } from "~/Controllers/category/filter-list-category/protocols";
import client from "~/database/postgres";

export class FilterListCategoryRepository {
  async filterListCategory(params: filterCategory) {
    const filterCategory = await client.invoice.findMany({
      where: {
        userId: params.userId,
        categoryId: params.title,
      },
    });

    return filterCategory;
  }
}
