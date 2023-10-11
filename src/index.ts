import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./Controllers/get-users/get-users";
import { PostgresGetUsers } from "./repositories/postgress-get-user";

config();
const app = express();
const port = process.env.PORT || 3000;

app.get("/users", async (req, res) => {
  const postgresUserRepositoriy = new PostgresGetUsers();
  const getUsersController = new GetUsersController(postgresUserRepositoriy);
  const { body, statusCode } = await getUsersController.handle();
  res.send(body).status(statusCode).end();
});

app.listen(port, () => console.log(`listening on port ${port}!`));
