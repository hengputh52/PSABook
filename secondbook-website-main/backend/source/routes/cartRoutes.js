import express from "express";
import { addToCart, getCartItems } from "../controllers/cart.controller.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/add",authenticateToken, addToCart);
router.get("/user/:user_id", getCartItems);

export default router;
