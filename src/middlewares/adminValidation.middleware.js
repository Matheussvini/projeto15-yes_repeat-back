import dotenv from "dotenv";
dotenv.config();

export async function adminValidation(req, res, next) {
  const user = res.locals.user;
  const adminEmail = process.env.EMAIL_ADMIN;

  if (user.email !== adminEmail) {
    return res
      .status(401)
      .send({
        message:
          "Usuário não é o ADMIN. Receba permissão de ADMIN para fazer a modificação desejada!",
      });
  }

  next();
}
