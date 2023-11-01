import { Router } from "express";

import { CreateCategoryController } from "~/Controllers/category/create-category/create-category";
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

export { categoryRouter };
