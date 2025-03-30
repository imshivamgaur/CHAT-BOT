import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectToDB from "./src/config/db.js";
import ErrorHandler from "./src/utils/ErrorHandler.js";
import errorMiddleware from "./src/utils/ErrorMiddleware.js";
import askToGenAi from "./src/libs/GenAi.js";
import router from "./src/routes/chatRoutes.js";

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

// Error middlware
app.use(errorMiddleware);

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
