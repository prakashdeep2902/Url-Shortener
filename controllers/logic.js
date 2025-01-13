import { nanoid } from "nanoid";
import url from "../models/Url.js";

async function handleGenNewShortUrl(req, res) {
  try {
    const redirectUrl = req.body.redirectUrl;
    const ShortUrl = nanoid(8);

    console.log(redirectUrl);

    // if (!redirectUrl) {
    //   return res.status(400).json({ error: "Please Enter the url" });
    // }

    const newUrlData = new url({
      shortId: ShortUrl,
      redirectUrl: redirectUrl,
    });

    const newData = await newUrlData.save();

    return res.render("home", newData.shortId);
    res
      .status(201)
      .json({ msg: "data has been created", data: newData.shortId });
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

    console.log("entry is", entry);
    res.redirect(entry.redirectUrl);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

export { handleGenNewShortUrl, redirectTOurl };
