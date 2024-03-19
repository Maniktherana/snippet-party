import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", (error) => {
  console.error("Redis client error:", error);
});
