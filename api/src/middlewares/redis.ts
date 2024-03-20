import { createClient } from "redis";
import hash from "object-hash";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

let redisClient: any = undefined;

async function initializeRedisClient(): Promise<void> {
  let redisURL: string | undefined = process.env.REDIS_URL;
  if (redisURL) {
    redisClient = createClient({ url: redisURL });

    redisClient.on("error", (e: Error) => {
      console.error(`Failed to create the Redis client with error:`);
      console.error(e);
    });

    try {
      await redisClient.connect();
      // get all keys from redis
      const keys = await redisClient.keys("*");
      console.log(`Redis keys: ${keys}`);
      console.log(`Connected to Redis successfully!`);
    } catch (e) {
      console.error(`Connection to Redis failed with error:`);
      console.error(e);
    }
  }
}

function requestToKey(req: Request): string {
  // build a custom object to use as part of the Redis key
  const reqDataToHash = {
    query: req.query,
    body: req.body,
  };

  // `${req.path}@...` to make it easier to find
  // keys on a Redis client
  return `${req.path}@${hash.sha1(reqDataToHash)}`;
}

function isRedisWorking(): boolean {
  return !!redisClient?.isOpen;
}

async function writeData(key: string, data: any, options?: any): Promise<void> {
  if (isRedisWorking()) {
    try {
      await redisClient.set(key, data, options);
    } catch (e) {
      console.error(`Failed to cache data for key=${key}`, e);
    }
  }
}

async function readData(key: string): Promise<any> {
  let cachedValue: any = undefined;
  if (isRedisWorking()) {
    return await redisClient.get(key);
  }

  return cachedValue;
}

function redisCachingMiddleware(
  options: { EX?: number } = {
    EX: 60,
  }
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (isRedisWorking()) {
      const key = requestToKey(req);
      const cachedValue = await readData(key);
      if (cachedValue) {
        console.log("cache hit");
        try {
          return res.json(JSON.parse(cachedValue));
        } catch {
          return res.send(cachedValue);
        }
      } else {
        console.log("cache miss");
        // override how res.send behaves to introduce the caching logic
        const oldSend = res.send;
        res.send = function (data: any) {
          // set the function back to avoid the 'double-send' effect
          res.send = oldSend;
          if (res.statusCode.toString().startsWith("2")) {
            writeData(key, data, options).then();
          }

          return res.send(data);
        };

        // continue to the controller function
        next();
      }
    } else {
      // proceed with no caching
      next();
    }
  };
}

export { initializeRedisClient, redisCachingMiddleware };
