const { createClient } = require("redis");

const client = createClient({ url: process.env.REDIS_URL });
client.on("error", (err) =>
  console.log("Could not establish a connection with redis", err)
);

// client.on("connect", (err) => console.log("Connected to redis"));

client.connect();

module.exports = client;
