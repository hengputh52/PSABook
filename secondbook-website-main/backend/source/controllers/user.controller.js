// === user.controller.js ===
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize"; // <-- Add this import

// Signup (register) a new user
export const signupUser = async (req, res) => {
  try {
    const { username, email, password, full_name, address, phone_number } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email and password are required" });
    }
    const profile_photo = req.file?.path || null;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username.trim(),
      email: email.trim(),
      password_hash,
      full_name,
      profile_photo,
      address: address ?? "", // ensure not null for strict DB schemas
      phone_number: phone_number ?? "",
    });

    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User created", user, token }); // return token
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Find user by username or email
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    // Set token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Allow cross-site cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout user
export const logoutUser = async (req, res) => {
  try {
    // Clear the HTTP-only cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password_hash"] }
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Combine JSON fields with any uploaded file path (if multipart form)
    const updates = { ...req.body };
    if (req.file) {
      updates.profile_photo = req.file.filename;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Only update keys that are allowed and have a non-empty value
    const allowed = [
      "full_name",
      "profile_photo",
      "address",
      "phone_number",

      "favorite_genre",
      "favorite_book",
    ];
    allowed.forEach((key) => {
      if (updates[key] !== undefined && updates[key] !== "") {
        user[key] = updates[key];
      }
    });

    await user.save();

    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
