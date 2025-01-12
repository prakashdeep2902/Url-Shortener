import express, { json } from "express";
const port = 7070;
const app = express();
import router from "./routes/urlRouter.js";
import ConnectTOmongodbLocal from "./dbconnection/LocalDb.js";

ConnectTOmongodbLocal("mongodb://localhost:27017/urlShortner")
  .then((data) => {
    console.log(console.log(`mongodbConntected`));
  })
  .catch((error) => {
    console.log("some error");
  });

// middleware

app.use(express.json());
app.use("/url", router);
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
