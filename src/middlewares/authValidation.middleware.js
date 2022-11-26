import jwt from "jsonwebtoken";
import { usersCollection } from "../database/db.js";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const secretKey = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).send({
      message:
        'Envie um header na requisição com campo "authorization" com valor "Bearer TokenDoUsuario"!',
    });
  }

  try {
    const data = jwt.verify(token, secretKey);

    const user = await usersCollection.findOne({ _id: new ObjectId( data?.userId) });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Token inválido, faça login novamente." });
    }

    delete user.password;
    res.locals.user = user;
  } catch (err) {
    res.status(500).send(err.message);
  }
  next();
}
