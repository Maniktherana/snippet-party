import { Router } from "express";

import {
  createSubmission,
  deleteSubmission,
  getSubmission,
  getSubmissions,
  updateSubmission,
} from "../controllers/submission.controller";

import { validateData } from "../middlewares/validation";
import { submissionSchema } from "../schemas";

const router = Router();

router.post("/", validateData(submissionSchema), createSubmission);
router.get("/", getSubmissions);
router.get("/:submissionsId", getSubmission);
router.patch(
  "/:submissionsId",
  validateData(submissionSchema),
  updateSubmission
);
router.delete("/:submissionsId", deleteSubmission);

export default router;
