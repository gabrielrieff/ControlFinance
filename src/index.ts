import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./Controllers/get-users/get-users";
import { PostgresGetUsersRepository } from "./repositories/get-users/postgres-get-user";
import { PostgresCreateUserRepository } from "./repositories/create-user/postgres-user";
import { CreateUserController } from "./Controllers/create-user/create-user";

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

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
