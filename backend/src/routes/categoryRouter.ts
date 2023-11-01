import { Router } from "express";

import { CreateCategoryController } from "~/Controllers/category/create-category/create-category";
import { FilterListCategoryController } from "~/Controllers/category/filter-list-category/filterListCategory";
import { ListCategoryController } from "~/Controllers/category/list-category/list-category";
import { isAuthenticated } from "~/middlewares/isAuthenticated";

const categoryRouter = Router();

categoryRouter.post(
  "/category",
  isAuthenticated,
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

export { categoryRouter };
