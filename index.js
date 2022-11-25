import express from "express";
const app = express();
const port = 3000;

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

app.get("/js", (req, res) => {
  res.sendFile(__dirname + "/main.js");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
