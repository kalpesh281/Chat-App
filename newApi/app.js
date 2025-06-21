import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import UserAuthRoute from "./routes/UserAuthRoute.js";
import ChatRoute from "./routes/ChatRoute.js";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v2/auth", UserAuthRoute);
app.use("/api/v2/chat", ChatRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
