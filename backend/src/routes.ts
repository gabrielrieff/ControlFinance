import { Router } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./Controllers/User/create-user/create-user";
import { UpdateUserController } from "./Controllers/User/update-user/update-user";
import { deleteUserController } from "./Controllers/User/delete-user/delete-user";
import { AuthUserController } from "./Controllers/User/auth-user/auth-user";
import { GetUsersController } from "./Controllers/User/get-users/get-users";
import { ToForgotPasswordController } from "./Controllers/User/to-forgot-password/to-forgot-password";
import { ToRecoverPasswordController } from "./Controllers/User/to-recover-user/to-recover-password";
import { ResetPasswordController } from "./Controllers/User/reset-password/reset-password";
import { CreateInovoiceController } from "./Controllers/Inovoice/create-inovoice/create-inovoice";

const router = Router();

//User
router.post("/session", new AuthUserController().handle);
router.post("/user", isAuthenticated, new CreateUserController().handle);
router.get("/users", isAuthenticated, new GetUsersController().handle);
router.delete("/user/:id", isAuthenticated, new deleteUserController().handle);
router.patch("/user/:id", isAuthenticated, new UpdateUserController().handle);
router.post("/forgotpassword", new ToForgotPasswordController().handle);
router.post("/recoverpassword", new ToRecoverPasswordController().handle);
router.post(
  "/resetpassword",
  isAuthenticated,
  new ResetPasswordController().handle
);

//inovoice
router.post(
  "/invoices",
  isAuthenticated,
  new CreateInovoiceController().handle
);
export { router };
