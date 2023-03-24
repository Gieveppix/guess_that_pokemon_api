const { createClient } = require("redis");

const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on("error", (err) => {
  console.error("Could not connect to Redis:", err);
});

redisClient.connect().catch(console.error);


module.exports = redisClient;
