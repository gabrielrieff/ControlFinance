import client from "../../../database/postgres";
import crypto from "crypto";
import { transporter } from "../../../services/mailer";

export class PostgresToForgotPasswordRepository {
  async forgotPassword(email: string) {
    try {
      const user = await client.user.findFirst({
        where: { email: email },
      });

      if (!user) {
        throw new Error("Email not found!");
      }

      const token = crypto.randomBytes(20).toString("hex");
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await client.user.updateMany({
        where: { email: email },
        data: {
          passwordResetExpired: now,
          passwordResetToken: token,
        },
      });
      //console.log(transporter);
      transporter.sendMail(
        {
          to: email,
          from: "gabeerieff@gmail.com",
          template: "auth/forgot_password",
          context: { token },
          subject: "Email enviado",
        },
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
    } catch (error) {
      throw new Error("Cannot send password email!");
    }
  }
}
