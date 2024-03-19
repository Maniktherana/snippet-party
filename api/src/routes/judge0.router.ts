import { Router } from "express";

import {
  createStdout,
  getStdout,
  runJudge0,
} from "../controllers/judge0.controller";

const router = Router();

router.post("/add", createStdout);
router.get("/get", getStdout);
router.post("/", runJudge0);

export default router;
