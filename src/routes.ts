import { Router } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./Controllers/User/create-user/create-user";
import { UpdateUserController } from "./Controllers/User/update-user/update-user";
import { deleteUserController } from "./Controllers/User/delete-user/delete-user";
import { AuthUserController } from "./Controllers/User/auth-user/auth-user";
import { GetUsersController } from "./Controllers/User/get-users/get-users";
import { ToForgotPassword } from "./Controllers/User/to-forgot-password/to-forgot-password";

const router = Router();

router.post("/session", new AuthUserController().handle);
router.post("/user", isAuthenticated, new CreateUserController().handle);
router.get("/users", isAuthenticated, new GetUsersController().handle);
router.delete("/user/:id", isAuthenticated, new deleteUserController().handle);
router.patch("/user/:id", isAuthenticated, new UpdateUserController().handle);

router.post("/forgotpassword", new ToForgotPassword().handle);

export { router };
