import { Router } from "express";

import multer from "multer";
import uploadConfig from "~/config/multer";

import { AuthUserController } from "~/Controllers/User/auth-user/auth-user";
import { CreateUserController } from "~/Controllers/User/create-user/create-user";
import { deleteUserController } from "~/Controllers/User/delete-user/delete-user";
import { DetailUserController } from "~/Controllers/User/detail-user/detail-user";
import { GetUsersController } from "~/Controllers/User/get-users/get-users";
import { ResetPasswordController } from "~/Controllers/User/reset-password/reset-password";
import { ToForgotPasswordController } from "~/Controllers/User/to-forgot-password/to-forgot-password";
import { ToRecoverPasswordController } from "~/Controllers/User/to-recover-user/to-recover-password";
import { UpdateUserController } from "~/Controllers/User/update-user/update-user";
import { isAuthenticated } from "~/middlewares/isAuthenticated";

const userRouter = Router();

const upload = multer(uploadConfig.upload("./tmp/image/user"));

userRouter.post("/session", new AuthUserController().handle);
userRouter.post("/user", isAuthenticated, new CreateUserController().handle);
userRouter.get("/users", isAuthenticated, new GetUsersController().handle);
userRouter.get(
  "/user/detail",
  isAuthenticated,
  new DetailUserController().handle
);
userRouter.delete(
  "/user/:id",
  isAuthenticated,
  new deleteUserController().handle
);
userRouter.patch(
  "/user/:id",
  isAuthenticated,
  upload.single("file"),
  new UpdateUserController().handle
);
userRouter.post("/forgotpassword", new ToForgotPasswordController().handle);
userRouter.post("/recoverpassword", new ToRecoverPasswordController().handle);
userRouter.post(
  "/resetpassword",
  isAuthenticated,
  new ResetPasswordController().handle
);

export { userRouter };
