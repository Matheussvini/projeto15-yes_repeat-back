import { Router } from "express";
import {
  getProducts,
  postProducts,
  putProducts,
  deleteProducts,
  getProductById
} from "../controllers/products.controllers.js";
import { adminValidation } from "../middlewares/adminValidation.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { idProductExists, productsValidation } from '../middlewares/productsValidation.middleware.js'

const router = Router();

router.get("/produtos", getProducts);

router.get("/produtos/:id", getProductById);

router.use(authValidation);

router.use(adminValidation);

router.use(productsValidation);

router.post("/produtos", postProducts);

router.put("/produtos/:id",idProductExists, putProducts);

router.delete("/produtos/:id", idProductExists, deleteProducts);

export default router;
