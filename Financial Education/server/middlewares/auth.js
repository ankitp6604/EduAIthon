import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userSchema.js";

dotenv.config();

const SECRET_KEY = process.env.JWTkey;

// Regular auth middleware
const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("Auth header:", token); // Debug log
    if (token) {
      token = token.split(" ")[1];
      console.log("Token after split:", token); // Debug log
      let user = jwt.verify(token, SECRET_KEY);
      console.log("Decoded user:", user); // Debug log
      req.userID = user.id; // Changed from uid to id to match the token payload
      req.user = user; // Store the full user object from token
    } else {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    next();
  } catch (error) {
    console.log("Auth middleware error:", error); // Debug log
    res.status(401).json({ message: "Unauthorized User", error: error.message });
  }
};

// Admin auth middleware
const adminAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Verify if user is admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }

    // Double check with database
    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }

    req.userID = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Admin auth middleware error:", error);
    res.status(401).json({ message: "Unauthorized User", error: error.message });
  }
};

export { auth, adminAuth };
export default auth;
