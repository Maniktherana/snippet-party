import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { client } from "../db/redis";
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

  const key = token;
  const cachedData = await client.get(key).catch((err) => {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  });

  if (cachedData != null) {
    console.log("Cache hit");
    res.status(StatusCodes.OK).send(cachedData);
  } else {
    try {
      const response = await axios.get(url, { params, headers });

      await client.set(key, JSON.stringify(response.data));
      await client.expire(key, 60);

      return res.status(StatusCodes.OK).json({
        success: true,
        data: response.data.stdout,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: null,
        message: `Judge0 error: ${error}`,
      });
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

  await client.connect();

  const key = JSON.stringify({ languageId, code, stdin });
  const cachedData = await client.get(key).catch((err) => {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Redis Error: ${err}` });
  });

  if (cachedData != null) {
    console.log("Cache hit");
    res.status(StatusCodes.OK).send(cachedData);
  } else {
    console.log("Cache miss");
    try {
      const response = await axios.post(url, body, { headers, params });

      // Cache response
      await client.set(key, JSON.stringify(response.data));
      await client.expire(key, 60);

      return res.status(StatusCodes.OK).json(response.data);
    } catch (error: any) {
      console.error(error.response);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: null,
        message: `Judge0 error: ${error}`,
      });
    }
  }
};
