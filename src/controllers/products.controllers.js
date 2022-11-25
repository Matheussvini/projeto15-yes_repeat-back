import { productsCollection } from "../database/db.js";

export async function postProducts(req, res) {
  const product = req.body;

  try {
    await productsCollection.insertOne(product);
    res.status(201).send({ message: "Produto cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).send(err.message);
  }
}

export async function getProducts(req, res) {
  // buscar produtos no banco
}

export async function getProductById(req, res) {
  // buscar produto no bandco pelo id como params
}

export async function putProducts(req, res) {
  // editar produto no banco
}

export async function deleteProducts(req, res) {
  // apagar produto do banco
}
