import express from "express";
import url from "../models/Url.js";
const router = express.Router();

router.get("/home", async (req, res) => {
  try {
    const dbData = await url.find({});

    console.log("dbData");
    console.log(dbData);

    res.render("home", {
      dbData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});
export default router;
