import { Request, Response, Router } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { GetUsersController } from "./Controllers/User/get-users/get-users";
import { PostgresGetUsersRepository } from "./repositories/User/get-users/postgres-get-user";
import { PostgresCreateUserRepository } from "./repositories/User/create-user/postgres-user";
import { CreateUserController } from "./Controllers/User/create-user/create-user";
import { PostgresUpdateUserRepository } from "./repositories/User/update-user/postgres-update-user";
import { UpdateUserController } from "./Controllers/User/update-user/update-user";
import { PostgresDeleteUserRepository } from "./repositories/User/delete-user/postgres-dalete-user";
import { deleteUserController } from "./Controllers/User/delete-user/delete-user";
import { PostgresAuthUserRepository } from "./repositories/User/auth-user/postgres-auth-user";
import { AuthUserController } from "./Controllers/User/auth-user/auth-user";

const router = Router();

router.post("/session", async (req, res) => {
  const postgresAuthUserRepository = new PostgresAuthUserRepository();
  const authUserContrller = new AuthUserController(postgresAuthUserRepository);
  const { body, statusCode } = await authUserContrller.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
});

router.get("/users", async (req: Request, res: Response) => {
  isAuthenticated(req, res);

  const postgresUserRepositoriy = new PostgresGetUsersRepository();
  const getUsersController = new GetUsersController(postgresUserRepositoriy);
  const { body, statusCode } = await getUsersController.handle();
  res.status(statusCode).send(body).end();
});

router.post("/users", async (req, res) => {
  isAuthenticated;
  const postgresCreateUserRepositoriy = new PostgresCreateUserRepository();
  const createUserController = new CreateUserController(
    postgresCreateUserRepositoriy
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

router.patch("/user/:id", async (req, res) => {
  const postgresUpdateUsersRepository = new PostgresUpdateUserRepository();
  const updateUsersController = new UpdateUserController(
    postgresUpdateUsersRepository
  );

  const { body, statusCode } = await updateUsersController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

router.delete("/user/:id", async (req, res) => {
  const postgresDeleteUsersRepository = new PostgresDeleteUserRepository();
  const daleteUsersController = new deleteUserController(
    postgresDeleteUsersRepository
  );

  const { body, statusCode } = await daleteUsersController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export { router };
