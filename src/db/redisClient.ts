import { createClient } from "redis";

import config from "../config/config.js";

const redis = createClient({
  url: config.redisUrl || "redis://localhost:6379",
});

redis.on("error", (err) => console.log("Redis Client Error", err));

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
};

export default redis;
