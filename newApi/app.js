import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/features.js";
import UserAuthRoute from "./routes/UserAuthRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import AdminRoute from "./routes/AdminRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v2/auth", UserAuthRoute);
app.use("/api/v2/chat", ChatRoute);
app.use("/api/v2/admin", AdminRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
