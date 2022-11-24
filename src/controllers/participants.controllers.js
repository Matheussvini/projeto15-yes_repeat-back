import { signInSchema, signUpSchema } from "../model/users.model.js";
import { usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUpParticipants(req, res) {
  const { error } = signUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const arrErrors = error.details.map((e) => e.message);
    return res.status(422).send(arrErrors);
  }

  try {
    const { name, email, password } = req.body;

    const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return res.status(409).send({
        message:
          "Email já cadastrado, por favor efetue o login ou registre-se com outro email",
      });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await usersCollection.insertOne({ ...req.body, password: passwordHash });
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signInParticipants(req, res) {
  const { error } = signInSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const arrErrors = error.details.map((e) => e.message);
    return res.status(422).send(arrErrors);
  }

  try {
    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).send({
        message:
          "Email não cadastrado, por favor verifique o email ou cadastre-se.",
      });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const data = { userId: user._id };
      const secretKey = process.env.JWT_SECRET;
      const configs = { expiresIn: 60 * 60 * 24 * 30 };

      const token = jwt.sign(data, secretKey, configs);

      delete user.password;
      res.status(200).send({ ...user, token });
    } else {
      res.status(401).send({
        message: "Senha incorreta, verifique sua senha e tente novamente.",
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
