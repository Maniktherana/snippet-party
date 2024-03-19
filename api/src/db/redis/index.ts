import Redis from "redis";
import dotenv from "dotenv";

dotenv.config();

export const client = Redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (error) => {
  console.error("Redis client error:", error);
});
