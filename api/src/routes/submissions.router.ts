import { Router } from "express";

import {
  createSubmission,
  deleteSubmission,
  getSubmissionById,
  getSubmissions,
  updateSubmission,
} from "../controllers/submission.controller";

import { validateData } from "../middlewares/validation";
import { submissionSchema } from "../schemas";
import { redisCachingMiddleware } from "../middlewares/redis";

const router = Router();

router.post("/", validateData(submissionSchema), createSubmission);
router.get("/", redisCachingMiddleware(), getSubmissions);
router.get("/:submissionsId", getSubmissionById);
router.patch(
  "/:submissionsId",
  validateData(submissionSchema),
  updateSubmission
);
router.delete("/:submissionsId", deleteSubmission);

export default router;
