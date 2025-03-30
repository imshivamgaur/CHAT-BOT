import express from "express";
import {
  chatHandler,
  getPreviousChats,
  testHandler,
} from "../controllers/ChatController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/test", testHandler);
router.post("/chats", requireAuth, chatHandler);
router.get("/chats", requireAuth, getPreviousChats);

export default router;
