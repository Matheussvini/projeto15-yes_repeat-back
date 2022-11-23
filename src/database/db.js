import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
  await mongoClient.connect();
} catch (err) {
  console.log("Erro no mongo.conect", err);
}

db = mongoClient.db("api-yes-repeat");
export const usersCollection = db.collection("users");
export const productsCollection = db.collection("products");
export const salesCollection = db.collection("sales");

// export const sessionsCollection = db.collection("sessions"); 
// Vai precisar ou a nova lib de token que o Thi recomendou já salva user + token?
