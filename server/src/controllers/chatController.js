import ErrorHandler from "../utils/ErrorHandler.js";
import askToGenAi from "../libs/GenAi.js";
import Chat from "../models/Chat.js";

// POST the prompt and save to db.
export const chatHandler = async (req, res, next) => {
  try {
    let { prompt } = req?.body;
    console.log(prompt, "message");
    const userId = req.userId; //Clerk userId from authMiddlware

    if (!prompt) {
      return next(new ErrorHandler("Please provide your prompt", 404));
    }

    const aiResponse = await askToGenAi(prompt);

    // saving to database
    const chat = await Chat.create({
      userId,
      userMessage: prompt,
      aiResponse: aiResponse,
    });

    console.log("Response send to frontend");

    res.status(200).json({
      success: true,
      Response: chat,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 406));
  }
};

// previous chats
export const getPreviousChats = async (req, res, next) => {
  try {
    const userId = req.userId;

    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });
    console.log(chats);

    res.status(200).json({ success: true, allchats: chats });
  } catch (error) {
    next(new ErrorHandler(error.message));
  }
};

export const testHandler = (req, res) => {
  res.send("Response from testHandler");
};
