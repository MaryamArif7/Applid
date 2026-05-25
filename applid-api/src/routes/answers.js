import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { getAnswers } from "../controllers/answers.js";

const router = Router();

router.use(authenticate);
router.get("/", getAnswers);

export default router;
