import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { router } from "./routes";

const main = async () => {
  config();
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

  app.use(router);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return res.status(400).json({
        error: err.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
