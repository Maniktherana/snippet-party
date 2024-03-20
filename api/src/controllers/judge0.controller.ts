import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import dotenv from "dotenv";
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

  try {
    const data = await axios.get(url, { params, headers });
    const response = {
      success: true,
      data: data.data.stdout,
      message: "Submission retrieved successfully",
    };

    return res.status(StatusCodes.OK).json(response);
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
        success: false,
        data: null,
        message: `Judge0 error: Too many requests`,
      });
    }
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: null,
      message: `Judge0 error: ${error}`,
    });
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

  try {
    const data = await axios.post(url, body, { headers, params });
    const response = {
      success: true,
      data: data.data,
      message: "Submitted Successfully",
    };

    return res.status(StatusCodes.OK).json(response);
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
        success: false,
        data: null,
        message: `Judge0 error: Too many requests`,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: null,
      message: `Judge0 error: ${error}`,
    });
  }
};
