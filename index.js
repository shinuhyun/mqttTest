import express from "express";
import mqtt from "mqtt";
import cors from "cors";

const app = express();
const port = 3000;

import path from "path";

import { fileURLToPath } from "url";
import { json } from "stream/consumers";

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
  console.log(req.body);
  const { pub_ip, pub_topic, pub_message } = req.body;
  console.log("server", { pub_ip, pub_topic, pub_message });

  const client = mqtt.connect(`mqtt://${pub_ip}`);
  client.publish(pub_topic, pub_message);
  client.publish(pub_topic, "lelele");
  client.on("message", function (pub_topic, message) {
    // message is Buffer
    console.log(message.toString());
    client.end();
  });
  res.status(200).json({ pub_message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
