import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateCategoryController } from "../Controllers/category/create-category";

const categoryRouter = Router();

categoryRouter.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

export { categoryRouter };
