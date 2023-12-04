import { Router } from "express";

import multer from "multer";
import uploadConfig from "~/config/multer";

import { CreateCategoryController } from "~/Controllers/category/create-category/create-category";
import { DeleteCategoryController } from "~/Controllers/category/delete-category/delete-category";
import { FilterListCategoryController } from "~/Controllers/category/filter-list-category/filterListCategory";
import { ListCategoryController } from "~/Controllers/category/list-category/list-category";
import { isAuthenticated } from "~/middlewares/isAuthenticated";

const categoryRouter = Router();

const upload = multer(uploadConfig.upload("./tmp/image/category"));

categoryRouter.post(
  "/category",
  isAuthenticated,
  upload.single("file"),
  new CreateCategoryController().handle
);

categoryRouter.get(
  "/category",
  isAuthenticated,
  new ListCategoryController().handle
);

categoryRouter.get(
  "/category/:id",
  isAuthenticated,
  new FilterListCategoryController().handle
);

categoryRouter.delete(
  "/category/:id",
  isAuthenticated,
  new DeleteCategoryController().handle
);

export { categoryRouter };
