import client from "~/database/postgres";
import { Category } from "~/models/category";

import { resolve } from "path";
import { deletePhoto } from "~/Helpers/deletePhoto";

export class DeleteCategoryRepository {
  async deleteCategory(id: string, userId: string): Promise<Category | string> {
    const user = await client.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not exist");
    }

    const existingCategori = await client.category.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        banner: true,
        title: true,
      },
    });

    if (!existingCategori) {
      throw new Error("category not found");
    }

    await client.category.delete({
      where: {
        id: id,
      },
    });

    const folder = "./tmp/image/category";

    const filePath = resolve(
      __dirname,
      "../",
      "../",
      "../",
      "../",
      folder,
      existingCategori.banner
    );

    await deletePhoto(filePath);

    return existingCategori!;
  }
}
