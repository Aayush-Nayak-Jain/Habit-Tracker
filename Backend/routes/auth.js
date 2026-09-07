import express from "express";
import { registerUser, loginUser, me, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router= express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, me);
router.put("/me", protect, updateProfile);

export default router;

