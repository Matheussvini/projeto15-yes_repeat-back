import { Router } from "express";
import {
  getProducts,
  postProducts,
  putProducts,
  deleteProducts
} from "../controllers/products.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { productsValidation } from "../middlewares/productsValidation.middleware.js";

const router = Router();

router.use(authValidation);

router.get("/produtos", getProducts);

router.delete("/produtos/:id", deleteProducts);

router.use(productsValidation);

router.post("/produtos", postProducts);

router.put("/produtos/:id", putProducts);

export default router;
