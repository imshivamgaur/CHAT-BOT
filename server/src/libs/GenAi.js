import { GoogleGenAI } from "@google/genai";
import ErrorHandler from "../utils/ErrorHandler.js";
import dotenv from "dotenv";
dotenv.config();

const genAi = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

const askToGenAi = async (prompt) => {
  try {
    const response = await genAi.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    if (!response) {
      throw new ErrorHandler("Response not getting");
    }
    return response?.text;
  } catch (error) {
    throw new ErrorHandler(error.message);
  }
};

export default askToGenAi;
