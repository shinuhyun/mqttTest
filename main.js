console.log("THIS IS SERVER!!!");

const pubBtn = document.querySelector("#publishBtn");

pubBtn.addEventListener("click", publishMessage);

async function publishMessage(e) {
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
