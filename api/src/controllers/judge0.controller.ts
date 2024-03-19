import axios, { AxiosResponse } from "axios";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { client } from "../db/redis";

dotenv.config();

export const runJudge0 = async (req: Request, res: Response) => {
  const {
    languageId,
    sourceCode,
    stdin,
  }: { languageId: number; sourceCode: string; stdin: string } = req.body;

  try {
    const createResponse: AxiosResponse = await axios.post("/createStdout", {
      languageId,
      sourceCode,
      stdin,
    });

    const { token } = createResponse.data;
    const getResponse: AxiosResponse = await axios.post("/getStdout", {
      token,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      data: getResponse.data,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getStdout = async (req: Request, res: Response) => {
  const { token }: { token: string } = req.body;
  const options = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPIAPI_KEY,
      "X-RapidAPI-Host": process.env.X_RAPIAPI_HOST,
    },
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
      const response = await axios.request(options);

      // Cache response
      await client.set(key, JSON.stringify(response));
      await client.expire(key, 60);

      return res.status(StatusCodes.OK).json({
        success: true,
        data: response.data,
      });
    } catch (error) {
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
  const {
    languageId,
    sourceCode,
    stdin,
  }: { languageId: number; sourceCode: string; stdin: string } = req.body;

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/",
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.X_RAPIAPI_KEY,
      "X-RapidAPI-Host": process.env.X_RAPIAPI_HOST,
    },
    body: {
      language_id: languageId,
      source_code: sourceCode,
      stdin,
    },
  };

  const key = JSON.stringify({ languageId, sourceCode, stdin });
  const cachedData = await client.get(key).catch((err) => {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  });

  if (cachedData != null) {
    console.log("Cache hit");
    res.status(StatusCodes.OK).send(cachedData);
  } else {
    console.log("Cache miss");
    try {
      const response = await axios.request(options);

      // Cache response
      await client.set(key, JSON.stringify(response));
      await client.expire(key, 60);

      return res.status(StatusCodes.OK).json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: null,
        message: `Judge0 error: ${error}`,
      });
    }
  }
};
