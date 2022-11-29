console.log("THIS IS SERVER!!!");

window.addEventListener("load", () => {
  fetch("/messages")
    .then((res) => res.json())
    .then(console.log)
    .catch(console.error);
});

const pubBtn = document.querySelector("#publishBtn");
const saveBtn = document.querySelector("#saveBtn");

pubBtn.addEventListener("click", sendMessage);
saveBtn.addEventListener("click", saveMessage);

async function sendMessage() {
  const pub_ip = document.querySelector("#pub_ip").value;
  const pub_topic = document.querySelector("#pub_topic").value;
  const pub_message = document.querySelector("#pub_message").value;
  console.log({ pub_ip, pub_topic, pub_message });
  await fetch("/mqtt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pub_ip, pub_topic, pub_message }),
  })
    .then((res) => res.json())
    .then(console.log)
    .catch(console.error);
}

async function saveMessage() {
  const pub_ip = document.querySelector("#pub_ip").value;
  const pub_topic = document.querySelector("#pub_topic").value;
  const pub_message = document.querySelector("#pub_message").value;
  console.log({ pub_ip, pub_topic, pub_message });
  await fetch("/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pub_ip, pub_topic, pub_message }),
  })
    .then((res) => res.json())
    .then(console.log)
    .catch(console.error);
}
