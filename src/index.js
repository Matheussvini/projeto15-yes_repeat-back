import express from "express";
import cors from "cors";
import participantsRouters from "./routes/participants.routes.js";
import productsRouters from './routes/products.routes.js'
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(participantsRouters);
app.use(productsRouters);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
