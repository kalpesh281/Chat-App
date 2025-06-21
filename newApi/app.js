import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
