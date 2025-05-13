const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDB = require("./Config/Db");

const registerRoute = require("./Routes/registerRoute");
const messageRoute = require("./Routes/messageRoute");
const { initializeSocket, getReceiverSocketId } = require("./socket/socket");

// ==================== CONFIGURATION ====================
dotenv.config();
const PORT = process.env.PORT;

// ==================== EXPRESS APP SETUP ====================
const app = express();

// ==================== MIDDLEWARE ====================
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ==================== ROUTES ====================
app.use("/api/v1/auth", registerRoute);
app.use("/api/v1/message", messageRoute);

// ==================== SERVER & SOCKET ====================
const server = http.createServer(app);
const { io } = initializeSocket(server);

// ==================== DATABASE & SERVER INITIALIZATION ====================
ConnectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`✅ Socket.IO server is running on the same port`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection failed:", err);
  });


