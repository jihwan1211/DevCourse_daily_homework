const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();

// const redisClient = redis.createClient(process.env.REDIS_PORT);
const redisClient = redis.createClient({ legacyMode: true, port: process.env.REDIS_PORT });
redisClient.connect();
module.exports = redisClient;
