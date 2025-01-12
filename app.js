import express from "express";
const port = 7070;
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>kahsdlkasjdlk</h1>");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
