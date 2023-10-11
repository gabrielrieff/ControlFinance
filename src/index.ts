import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./Controllers/get-users/get-users";
import { PostgresGetUsers } from "./repositories/postgress-get-user";

const main = async () => {
  config();
  const app = express();

  app.get("/users", async (req, res) => {
    const postgresUserRepositoriy = new PostgresGetUsers();
    const getUsersController = new GetUsersController(postgresUserRepositoriy);
    const { body, statusCode } = await getUsersController.handle();
    res.send(body).status(statusCode).end();
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
