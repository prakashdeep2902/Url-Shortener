import express from "express";
import { handleSignup, handleLogin } from "../controllers/user.js";

const router = express.Router();

router.post("/submit", handleSignup);
router.post("/login", handleLogin);

export default router;
