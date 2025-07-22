import express from "express";
import { addToCart, getCartItems } from "../controllers/cart.controller.js";
const router = express.Router();

router.post("/add", addToCart);
router.get("/:user_id", getCartItems);

export default router;
