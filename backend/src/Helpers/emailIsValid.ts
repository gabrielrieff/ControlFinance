import validator from "validator";

export const isValidEmail = (email: string) => {
  const emailIsValid = validator.isEmail(email);

  if (!emailIsValid) {
    throw new Error("E-mail is invalid");
  }

  return;
};
