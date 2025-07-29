import express from "express";
import { getSellerInfo } from "../controllers/seller.controller.js";

const router = express.Router();

router.get("/:id",getSellerInfo);

export default router;