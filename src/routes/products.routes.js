import multer from "multer";
import multerConfig from "../config/multer.js";
import { Router } from "express";
import { adminValidation } from "../middlewares/adminValidation.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import {
  getProducts,
  postProducts,
  putProducts,
  deleteProducts,
  getProductById,
  postUrls,
  deleteUrls,
} from "../controllers/products.controllers.js";
import {
  idProductExists,
  productsValidation,
} from "../middlewares/productsValidation.middleware.js";

const router = Router();

router.get("/produtos", getProducts);

router.get("/produtos/:id", getProductById);

router.use(authValidation);

router.use(adminValidation);

router.post("/admin/urls", multer(multerConfig).single("file"), postUrls);

router.delete("/admin/urls/:key", deleteUrls);

router.use(productsValidation);

router.post("/admin/produtos", postProducts);

router.put("/admin/produtos/:id", idProductExists, putProducts);

router.delete("/admin/produtos/:id", idProductExists, deleteProducts);

export default router;
