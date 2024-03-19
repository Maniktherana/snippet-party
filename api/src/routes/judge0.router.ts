import { Router } from "express";

import { createStdout, getStdout } from "../controllers/judge0.controller";
import { validateData } from "../middlewares/validation";
import { judge0Schema } from "../schemas";

const router = Router();

router.post("/add", validateData(judge0Schema), createStdout);
router.get("/get", getStdout);

export default router;
