import { productsCollection } from "../database/db.js";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import aws from "aws-sdk";

const s3 = new aws.S3();

export async function postUrls(req, res) {
  const { location: url = "", key } = req.file;

  try {
    res.status(201).send({ message: "Imagem enviada com sucesso!", url, key });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteUrls(req, res) {
  const { key } = req.params;

  try {
    if (process.env.STORAGE_TYPE === "s3") {
      s3.deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      })
        .promise()
        .then((response) => {
          res.send(response);
        })
        .catch((response) => {
          res.send(response);
        });
    } else {
      promisify(fs.unlink)(
        path.resolve(__dirname, "../", "../", "tmp", "uploads", key)
      );
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postProducts(req, res) {
  let product = req.body;

  try {
    await productsCollection.insertOne(product);
    res
      .status(201)
      .send({ message: "Produto cadastrado com sucesso!", product });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getProducts(req, res) {
  // buscar produtos no banco
  const arr = await productsCollection.find({}).toArray();
  console.log("fui requisitada", arr);
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
