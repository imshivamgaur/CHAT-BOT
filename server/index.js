import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import ConnectToDB from "./Database/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const genAi = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

app.post("/chats", async (req, res, next) => {
  try {
    let message = req?.body?.message;
    console.log(message, "message");
    if (!message) {
      throw new Error("Please provide you message");
    }

    // stream response
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-control", "no-cache");
    res.setHeader("Connnection", "Keep-alive");

    const response = await genAi.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: message,
    });

    for await (const chunk of response) {
      if (chunk.text) {
        res.write(`data: ${chunk.text}\n\n`);
      }
    }

    res.end();
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message || "Something went wrong!",
  });
});

ConnectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\nServer is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    // throw new Error("Something went wrong");
    console.log(error);
  });
