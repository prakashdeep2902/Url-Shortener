import express, { json } from "express";
import path from "path";
const port = 7070;
const app = express();

import router from "./routes/urlRouter.js";
import staticRoute from "./routes/StaticRoutes.js";
import user from "./routes/user.js";
import ConnectTOmongodbLocal from "./dbconnection/LocalDb.js";
import { LogdinUserOnly } from "./middlewares/auth.js";

import cookieParser from "cookie-parser";

ConnectTOmongodbLocal("mongodb://localhost:27017/urlShortner")
  .then(() => {
    console.log(`mongodbConntected`);
  })
  .catch((error) => {
    console.log("some error");
  });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());

// routers
app.use("/url", LogdinUserOnly, router);
app.use("/", staticRoute);
app.use("/user", user);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
