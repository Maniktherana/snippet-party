import { Request, Response } from "express";
import {
  insertSubmissionSchema,
  langauges,
  submissions,
} from "../db/mysql/schema";
import { db } from "../db/mysql";
import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { Submission } from "../schemas";

export const createSubmission = async (req: Request, res: Response) => {
  let { username, language, code, stdin, stdout }: Submission = req.body;

  const submission = insertSubmissionSchema.parse({
    username,
    language,
    code,
    stdin,
    stdout,
  });

  try {
    const data = await db.insert(submissions).values(submission);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: data,
      message: "Added Successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, data: null, message: "Unable to add" });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  const { submissionId } = req.params;
  try {
    const submissionById = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, Number(submissionId)));

    return res.status(StatusCodes.OK).json({
      success: true,
      data: submissionById,
      message: "Added Successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: null,
      message: "Unable to get submission",
    });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const allSubmissions = await db.select().from(submissions);
    const response = {
      success: true,
      data: allSubmissions,
      message: "Fetched Successfully",
    };

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: null,
      message: "Unable to get submissions",
    });
  }
};

export const updateSubmission = async (req: Request, res: Response) => {
  let {
    username,
    language,
    code,
    stdin,
    stdout,
  }: {
    username: string;
    language: langauges;
    code: string;
    stdin: string;
    stdout?: string;
  } = req.body;
  const { submissionId } = req.params;

  const updatedSubmission = insertSubmissionSchema.parse({
    username,
    language,
    code,
    stdin,
    stdout,
  });

  try {
    if (!submissionId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Please provide submission_id to update",
      });
    }

    const data = await db
      .update(submissions)
      .set(updatedSubmission)
      .where(eq(submissions.id, Number(submissionId)));
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: data, message: "Updated Successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, data: null, message: "Cannot Update" });
  }
};

export const deleteSubmission = async (req: Request, res: Response) => {
  const { submissionId } = req.params;

  try {
    await db
      .delete(submissions)
      .where(eq(submissions.id, Number(submissionId)));
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: null, message: "Delete Successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, data: null, message: "Cannot Delete" });
  }
};
