import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/user.controller.js";
import {upload} from "../middleware/upload.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", upload.single("profile_photo"), signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/:id", authenticateToken, getUserProfile);
router.put("/:id", authenticateToken, upload.single("profile_photo"), updateUserProfile);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
