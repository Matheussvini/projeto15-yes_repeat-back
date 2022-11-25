import { productsSchema } from "../model/productsSchema.model.js";

export function productsValidation(req, res, next) {
  const product = req.body;

  const { error } = productsSchema.validate(product);
  if (error) {
    return res.status(422).send(error.message);
  }

  next();
}