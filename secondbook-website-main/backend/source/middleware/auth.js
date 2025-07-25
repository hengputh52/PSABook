import jwt from "jsonwebtoken";

// Middleware to verify JWT from cookie
export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Please log in to access this feature" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Session expired. Please log in again." });
  }
};
