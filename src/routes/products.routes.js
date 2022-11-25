import { Router } from "express";
import {
  getProducts,
  postProducts,
  putProducts,
  deleteProducts,
  getProductById
} from "../controllers/products.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { productsValidation } from '../middlewares/productsValidation.middleware.js'

const router = Router();

router.get("/produtos", getProducts);

router.get("/produtos/:id", getProductById);

router.use(authValidation);

router.delete("/produtos/:id", deleteProducts);

router.use(productsValidation);

router.post("/produtos", postProducts);

router.put("/produtos/:id", putProducts);

export default router;
