import express from "express";
import { addToCart, getCartItems, removeFromCart, clearCartByUser } from "../controllers/cart.controller.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/add",authenticateToken, addToCart);
router.get("/user/:user_id", getCartItems);
router.delete("/:cart_item_id", removeFromCart);
router.delete("/clear/:user_id", clearCartByUser);

export default router;
