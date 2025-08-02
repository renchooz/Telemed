import express from "express";
import {
  startSession,
  getActiveSessions,
  endSession,
} from "../controllers/sessionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/start", startSession);               
router.get("/active", protect, getActiveSessions); 
router.put("/end",protect, endSession);

export default router;
