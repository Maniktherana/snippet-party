import { Router } from "express";

import {
  createStdout,
  getStdout,
  runJudge0,
} from "../controllers/judge0.controller";
import { validateData } from "../middlewares/validation";
import { judge0Schema } from "../schemas";

const router = Router();

router.post("/add", validateData(judge0Schema), createStdout);
router.get("/get", getStdout);
router.post("/", runJudge0);

export default router;
