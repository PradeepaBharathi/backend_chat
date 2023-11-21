import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
const app = express();

import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import { messageRouter } from "./Routes/messageRoutes.js";
import { loginRouter } from "./Routes/userRoutes.js";
import { ChatRouter } from "./Routes/chatRoutes.js";
app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();

app.use(express.json());




const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is Connected to Database");
  } catch (err) {
    console.log("Server is NOT connected to Database", err.message);
  }
};
connectDb();

app.get("/", (req, res) => {
  res.send("API is running123");
});

app.use("/user", loginRouter);
app.use("/chat", ChatRouter);
app.use("/message",messageRouter);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is Running...${PORT}`));
