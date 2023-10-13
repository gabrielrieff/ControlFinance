import { HttpStatusCode } from "../commonProtocols";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ok = (body: any) => ({ statusCode: HttpStatusCode.OK, body });

export const created = (body: any) => ({
  statusCode: HttpStatusCode.CREATED,
  body,
});

export const BadRequest = (messege: string) => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: messege,
  };
};

export const serverError = () => ({
  statusCode: HttpStatusCode.SERVER_ERROR,
  body: "Something went wrong",
});
