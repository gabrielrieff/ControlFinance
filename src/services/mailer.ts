/* eslint-disable @typescript-eslint/no-var-requires */
import nodemailer from "nodemailer";
import path from "path";
const hbs = require("nodemailer-express-handlebars");

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 2525,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialDir: path.resolve("./src/resource/mail/"),
    defaultLayout: false,
    extName: ".html",
  },
  viewPath: path.resolve("./src/resource/mail/"),
  extName: ".html",
};

transporter.use("compile", hbs(handlebarOptions));

export { transporter };
