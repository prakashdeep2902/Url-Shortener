import express from "express";
import { handelGenNewShortUrl, redirectTOurl } from "../controllers/logic.js";

const router = express.Router();

router.post("/", handelGenNewShortUrl);
router.get("/:shortId", redirectTOurl);

export default router;
