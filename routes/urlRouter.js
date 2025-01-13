import express from "express";
import { handleGenNewShortUrl, redirectTOurl } from "../controllers/logic.js";

const router = express.Router();

router.post("/", handleGenNewShortUrl);
router.get("/:shortId", redirectTOurl);

export default router;
