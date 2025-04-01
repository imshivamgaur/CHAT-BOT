import ErrorHandler from "../utils/ErrorHandler.js";
import askToGenAi from "../libs/GenAi.js";
import Chat from "../models/Chat.js";

// POST: Create a chat & save to DB
export const chatHandler = async (req, res, next) => {
  try {
    let { prompt } = req?.body;
    // console.log(prompt, "message");
    const userId = req.userId; //Clerk userId from authMiddlware

    const title = prompt || "New Chat";
    let aiResponse = "";

    if (prompt) {
      aiResponse = await askToGenAi(prompt);
      console.log(aiResponse);
    }

    // saving to database
    const chat = await Chat.create({
      userId,
      title,
      messages: prompt
        ? [
            { sender: "user", text: prompt },
            { sender: "ai", text: aiResponse },
          ]
        : [],
    });

    console.log("Response send to frontend");

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 406));
  }
};

// GET: Fetch all chats for user (sidebar list)
export const getUserChats = async (req, res, next) => {
  try {
    const userId = req.userId; //clerk user Id

    const chats = await Chat.find({ userId })
      .select(" _id title")
      .sort({ createdAt: -1 });

    console.log(chats);

    res.status(200).json({ success: true, chats });
  } catch (error) {
    next(new ErrorHandler(error.message));
  }
};

// GET: Fetch messages of a specific chat
export const getChatMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const userId = req.userId;

    const chat = await Chat.findOne({ _id: chatId, userId });

    if (!chat) {
      return next(new ErrorHandler("Chat not found", 404));
    }

    res.status(200).json({ success: true, messages: chat.messages });
  } catch (error) {
    next(new ErrorHandler("No such chat found"));
  }
};

// PUT: Add new message to the chat
export const addMessageToChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { prompt } = req.body;
    console.log("PROOOOOOOOOMPT: ", prompt);
    const userId = req.userId; // Clerk userId from authMiddleware

    if (!prompt) {
      return next(new ErrorHandler("Please provide your message", 400));
    }

    const chat = await Chat.findOne({ _id: chatId, userId });

    if (!chat) {
      return next(new ErrorHandler("Chat not found", 404));
    }

    const aiResponse = await askToGenAi(prompt);

    chat.messages.push({ sender: "user", text: prompt });
    chat.messages.push({ sender: "ai", text: aiResponse });

    if (chat.title === "New Chat") {
      chat.title = prompt;
    }

    // Save the updated
    await chat.save();

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// DELETE:  delete chats but chatId functionality
export const DeleteUserChats = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    console.log("ChatId: ", chatId);
    const userId = req.userId; // Clerk userId from authMiddleware

    const chat = await Chat.deleteOne({ _id: chatId });
    console.log("chat", chat);

    if (!chat || chat.deletedCount === 0) {
      return next(new ErrorHandler("Chat not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

export const testHandler = (req, res) => {
  res.send("Response from testHandler");
};
