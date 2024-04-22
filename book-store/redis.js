const redis = require("redis");

// const redisClient = redis.createClient(process.env.REDIS_PORT);
const redisClient = redis.createClient({ legacyMode: true });
redisClient.connect();
module.exports = redisClient;
