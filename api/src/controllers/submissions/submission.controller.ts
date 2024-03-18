import { Request, Response } from "express";
import {
  insertSubmissionSchema,
  langauges,
  submissions,
} from "../../db/schema";
import { db } from "../../db/setup";
import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";

export const createSubmission = async (req: Request, res: Response) => {
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
      data: { data },
      message: "Added Successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, data: null, message: "Unable to add" });
  }
};

export const getSubmission = async (req: Request, res: Response) => {
  const { submissionId } = req.params;
  try {
    const submissionById = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, Number(submissionId)));

    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: submissionById });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: null,
      message: "Unable to get submissions",
    });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const allSubmissions = await db.select().from(submissions);

    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: allSubmissions });
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

    await db
      .update(submissions)
      .set(updatedSubmission)
      .where(eq(submissions.id, Number(submissionId)));
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Updated Successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: true, message: "Cannot Update" });
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
      .json({ success: true, message: "Delete Successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: true, message: "Cannot Delete" });
  }
};
