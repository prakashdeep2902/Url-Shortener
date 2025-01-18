import express from "express";
import url from "../models/Url.js";

const router = express.Router();

router.get("/home", async (req, res) => {
  try {
    const dbData = await url.find({});
    res.render("home", {
      dbData: dbData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login.ejs");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});
export default router;
