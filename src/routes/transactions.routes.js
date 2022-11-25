import { Router } from "express";


const router = Router();



router.post("/carrinho/:id", addShoppingCart);


export default router;