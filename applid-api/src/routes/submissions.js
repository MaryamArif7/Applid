import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getSubmissions,
  getSubmission,
  createSubmission,
  updateSubmissionStatus,
  deleteSubmission,
} from "../controllers/submissions.js";

const router = Router();

router.use(authenticate);

router.get("/",        getSubmissions);
router.get("/:id",     getSubmission);
router.post("/",       createSubmission);
router.patch("/:id",   updateSubmissionStatus);
router.delete("/:id",  deleteSubmission);

export default router;
