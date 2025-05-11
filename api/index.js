// ==================== IMPORTS ====================
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const ConnectDB = require("./Config/Db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// ==================== CONFIGURATION ====================
dotenv.config();
const PORT = process.env.PORT;
const registerRoute = require("./Routes/registerRoute");
const messageRoute = require("./Routes/messageRoute");

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

// ==================== SERVER SETUP ====================
const server = http.createServer(app);

// ==================== SOCKET.IO  ====================
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

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

// ==================== EXPORTS ====================
module.exports = { app, io, server };
