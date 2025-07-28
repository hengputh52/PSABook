import express from "express";
import { createTransaction } from "../controllers/transaction.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/add",authenticateToken, createTransaction);

export default router;