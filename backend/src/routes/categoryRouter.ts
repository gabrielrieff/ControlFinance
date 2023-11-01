import { Router } from "express";

import { CreateCategoryController } from "~/Controllers/category/create-category/create-category";
import { isAuthenticated } from "~/middlewares/isAuthenticated";

const categoryRouter = Router();

categoryRouter.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

export { categoryRouter };
