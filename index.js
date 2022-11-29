import express from "express";
import mqtt from "mqtt";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 3000;

import path from "path";

import { fileURLToPath } from "url";

const corsOption = {
  origin: "*",
  method: "GET,POST,PUT,PATCH,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

app.get("/js", (req, res) => {
  res.sendFile(__dirname + "/main.js");
});

app.post("/mqtt", async (req, res) => {
  const { pub_ip, pub_topic, pub_message } = req.body;
  console.log("server", { pub_ip, pub_topic, pub_message });
  const client = mqtt.connect(`mqtt://${pub_ip}`);
  client.publish(pub_topic, pub_message);
  res.status(200).json({ pub_message });
});

export let contents = [];
app.post("/message", async (req, res) => {
  const { pub_ip, pub_topic, pub_message } = req.body;
  console.log("server", { pub_ip, pub_topic, pub_message });
  contents.push(req.body);
  console.log(contents);
  res.status(200).json({ pub_ip, pub_topic, pub_message });
});

app.get("/messages", async (req, res) => {
  res.status(200).json({ contents });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
