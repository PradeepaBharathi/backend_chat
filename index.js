const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const { messageRouter } = require("./Routes/messageRoutes.js");
const { loginRouter } = require("./Routes/userRoutes.js");
const { ChatRouter } = require("./Routes/chatRoutes.js");

const app = express();

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
app.use("/message", messageRouter);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is Running...${PORT}`));
