import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { redis } from "../db/redis";
import { Judge0 } from "../schemas/index";

dotenv.config();

export const getStdout = async (req: Request, res: Response) => {
  const { token }: { token: string } = req.body;

  const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}`;
  const params = {
    base64_encoded: "true",
    fields: "*",
  };
  const headers = {
    "X-RapidAPI-Key": process.env.X_RAPIAPI_KEY,
    "X-RapidAPI-Host": process.env.X_RAPIAPI_HOST,
  };

  await redis.connect();

  const key = token;
  const cachedData = await redis.get(key).catch((err) => {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, data: null, message: "Redis Error" });
  });

  if (cachedData != null) {
    console.log("Cache hit");
    res.status(StatusCodes.OK).send(cachedData);
  } else {
    try {
      const data = await axios.get(url, { params, headers });
      const response = {
        success: true,
        data: data.data.stdout,
        message: "Submission retrieved successfully",
      };

      // Cache response
      await redis.set(key, JSON.stringify(response));
      await redis.expire(key, 60);

      return res.status(StatusCodes.OK).json(response);
    } catch (error: any) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: null,
        message: `Judge0 error: ${error}`,
      });
    } finally {
      await redis.disconnect();
    }
  }
};

export const createStdout = async (req: Request, res: Response) => {
  const { languageId, code, stdin }: Judge0 = req.body;

  const body = {
    language_id: languageId,
    source_code: code,
    stdin: stdin,
  };

  const headers = {
    "content-type": "application/json",
    "X-RapidAPI-Key": process.env.X_RAPIAPI_KEY,
    "X-RapidAPI-Host": process.env.X_RAPIAPI_HOST,
  };

  const url = "https://judge0-ce.p.rapidapi.com/submissions";
  const params = {
    base64_encoded: "true",
    fields: "*",
  };

  await redis.connect();

  const key = JSON.stringify({ languageId, code, stdin });
  const cachedData = await redis.get(key).catch((err) => {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, data: null, error: `Redis Error: ${err}` });
  });

  if (cachedData != null) {
    console.log("Cache hit");
    res.status(StatusCodes.OK).send(cachedData);
  } else {
    console.log("Cache miss");
    try {
      const data = await axios.post(url, body, { headers, params });
      const response = {
        success: true,
        data: data.data,
        message: "Submitted Successfully",
      };

      // Cache response
      await redis.set(key, JSON.stringify(response));
      await redis.expire(key, 60);

      return res.status(StatusCodes.OK).json(response);
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: null,
        message: `Judge0 error: ${error}`,
      });
    } finally {
      await redis.disconnect();
    }
  }
};
