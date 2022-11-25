import { productsCollection } from "../database/db.js";
import { productsSchema } from "../model/productsSchema.model.js";

export function productsValidation(req, res, next) {
  const product = req.body;

  const { error } = productsSchema.validate(product);
  if (error) {
    return res.status(422).send(error.message);
  }

  next();
}

export async function idProductExists(req, res, next) {
  const id = req.params.id;
  try {
    const idIncludes = await productsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!idIncludes) {
      return res.status(404).send("Não há nenhum produto com esse id");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  next();
}