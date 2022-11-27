import { productsCollection } from "../database/db.js";

export async function postProducts(req, res) {
  const product = req.body;

  try {
    await productsCollection.insertOne(product);
    res.status(201).send({ message: "Produto cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getProducts(req, res) {
  // buscar produtos no banco
  const arr = await productsCollection.findOne({name: "aaaa"})
  console.log("fui requisitada")
  return res.status(200).send(arr);
}

export async function getProductById(req, res) {
  // buscar produto no bandco pelo id como params
}

export async function putProducts(req, res) {
  const product = req.body;
  const productId = res.params.id;

  try {
    await productsCollection.updateOne({ _id: productId }, { $set: product });
    res.status(201).send({ message: "Produto editado com sucesso!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteProducts(req, res) {
  const id = req.params.id;

  try {
    await productsCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).send("Produto excluído com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
