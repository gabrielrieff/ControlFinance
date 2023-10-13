/* eslint-disable @typescript-eslint/no-explicit-any */
export const ok = (body: any) => ({ statusCode: 200, body });

export const created = (body: any) => ({ statusCode: 201, body });

export const BadRequest = (messege: string) => {
  return {
    statusCode: 400,
    body: messege,
  };
};

export const serverError = () => ({
  statusCode: 500,
  body: "Something went wrong",
});
