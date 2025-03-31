import express from "express";
import {
  addMessageToChat,
  chatHandler,
  DeleteUserChats,
  getChatMessages,
  getUserChats,
  testHandler,
} from "../controllers/ChatController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/test", testHandler);

// POST: Create a chat & save to DB
router.post("/chats", requireAuth, chatHandler);

// GET: Fetch all chats for user (sidebar list)
router.get("/chats", requireAuth, getUserChats);

// GET: Fetch messages of a specific chat
router.get("/chats/:chatId", requireAuth, getChatMessages);

// PUT: Add new message to the chat
router.put("/chats/:chatId", requireAuth, addMessageToChat);

// DELETE: Delete a chat using ChatId
router.delete("/chats/:chatId", requireAuth, DeleteUserChats);

export default router;
