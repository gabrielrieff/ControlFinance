import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "../Controllers/Helpers/requestHelper";
import { verify } from "jsonwebtoken";

interface payLoad {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next?: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as payLoad;

    req.user_id = sub;

    return next();
  } catch (error) {
    return Unauthorized("Does not have authentication credentials");
  }
}
