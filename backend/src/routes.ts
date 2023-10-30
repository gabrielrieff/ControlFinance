import { Router } from "express";
import { invoiceRouter } from "./routes/invoiceRoute";
import { userRouter } from "./routes/userRoutes";
import { categoryRouter } from "./routes/categoryRouter";

const router = Router();

router.use(categoryRouter);
router.use(invoiceRouter);
router.use(userRouter);

export { router };
