import { hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const passwordHash = await hash(password, 8);

  return passwordHash;
};
