import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./Controllers/User/get-users/get-users";
import { PostgresGetUsersRepository } from "./repositories/User/get-users/postgres-get-user";
import { PostgresCreateUserRepository } from "./repositories/User/create-user/postgres-user";
import { CreateUserController } from "./Controllers/User/create-user/create-user";
import { PostgresUpdateUserRepository } from "./repositories/User/update-user/postgres-update-user";
import { UpdateUserController } from "./Controllers/User/update-user/update-user";
import { PostgresDeleteUserRepository } from "./repositories/User/delete-user/postgres-dalete-user";
import { deleteUserController } from "./Controllers/User/delete-user/delete-user";

const main = async () => {
  config();
  const app = express();

  app.use(express.json());

  app.get("/users", async (req, res) => {
    const postgresUserRepositoriy = new PostgresGetUsersRepository();
    const getUsersController = new GetUsersController(postgresUserRepositoriy);
    const { body, statusCode } = await getUsersController.handle();
    res.status(statusCode).send(body).end();
  });

  app.post("/users", async (req, res) => {
    const postgresCreateUserRepositoriy = new PostgresCreateUserRepository();
    const createUserController = new CreateUserController(
      postgresCreateUserRepositoriy
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/user/:id", async (req, res) => {
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

  app.delete("/user/:id", async (req, res) => {
    const postgresDeleteUsersRepository = new PostgresDeleteUserRepository();
    const daleteUsersController = new deleteUserController(
      postgresDeleteUsersRepository
    );

    const { body, statusCode } = await daleteUsersController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
