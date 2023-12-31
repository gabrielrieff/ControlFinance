import client from "~/database/postgres";

export class ListCategoryRepository {
  async listCategory() {
    const categoryList = client.category.findMany({
      select: {
        id: true,
        title: true,
        banner: true,
      },
    });

    return categoryList;
  }
}
