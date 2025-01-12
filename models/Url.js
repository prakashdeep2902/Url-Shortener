import mongoose from "mongoose";

const UrlModel = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      require: true,
    },
    visitHistory: [
      {
        timestamp: { type: String },
      },
    ],
  },
  { timestamp: true }
);

const url = mongoose.model("URL", UrlModel);
export default url;
