console.log("THIS IS SERVER!!!");
import mqtt from "/mqtt";

const pubBtn = document.querySelector("#publishBtn");
const client = mqtt.connect("mqtt://test.mosquitto.org");

client.publish("presence", "Hello mqtt");

pubBtn.addEventListener("click", publishMessage);

function publishMessage() {
  console.log("publish!");
}

// client.on("connect", function () {
//   client.subscribe("presence", function (err) {
//     if (!err) {
//       client.publish("presence", "Hello mqtt");
//     }
//   });
// });

// client.on("message", function (topic, message) {
//   // message is Buffer
//   console.log(message.toString());
//   client.end();
// });
