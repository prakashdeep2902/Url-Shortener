import { nanoid } from "nanoid";
import url from "../models/Url.js";

async function handleGenNewShortUrl(req, res) {
  try {
    const redirectUrl = req.body.redirectUrl;
    if (!redirectUrl) {
      return res.status(400).json({ error: "redirection url is requierd" });
    }

    const ShortUrl = nanoid(8);
    const newUrlData = new url({
      shortId: ShortUrl,
      redirectUrl: redirectUrl,
    });

    const newData = await newUrlData.save();
    console.log(newData);
    return res.render("home.ejs", { id: newData.shortId });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function redirectTOurl(req, res) {
  try {
    const shortId = req.params.shortId;

    const entry = await url.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    res.redirect(entry.redirectUrl);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

export { handleGenNewShortUrl, redirectTOurl };
