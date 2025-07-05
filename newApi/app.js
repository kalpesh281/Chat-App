// =======================
// Imports & Config
// =======================
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/features.js";
import UserAuthRoute from "./routes/UserAuthRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import { Server } from "socket.io";
import { createServer } from "http";
import {
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  STOP_TYPING,
  TYPING,
  NEW_REQUEST,
} from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/MessageSchema.js";
import { socketAuthenticator } from "./middlewares/SocketAuthMiddleware.js";

dotenv.config();

// =======================
// Express & Server Setup
// =======================
const app = express();
const server = createServer(app);

// =======================
// Socket.io Setup
// =======================
const io = new Server(server, {
  cors: {
    origin: ["https://chat-app-swart-beta.vercel.app/","http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
  },
});

app.set("io", io);

const PORT = process.env.PORT || 5001;
const userSocketIds = new Map();

// =======================
// Socket.io Middleware
// =======================
io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async (err) =>
    socketAuthenticator(err, socket, next)
  );
});

// =======================
// Socket.io Events
// =======================
io.on("connection", (socket) => {
  const user = socket.user;
  // console.log("Socket connected:", user);
  userSocketIds.set(user._id.toString(), socket.id);
  // console.log("Client connected", userSocketIds);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    // console.log("NEW_MESSAGE event received:", { chatId, members, message });
    // console.log(members, "members in NEW_MESSAGE event");
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDb = {
      content: message,
      chat: chatId,
      sender: user._id,
    };
    // console.log("Message for real-time:", messageForRealTime);
    const memberSockets = getSockets(members);
    // console.log("Member sockets:", memberSockets);

    io.to(memberSockets).emit(NEW_MESSAGE, {
      message: messageForRealTime,
      chatId,
    });
    io.to(memberSockets).emit(NEW_MESSAGE_ALERT, {
      chatId,
    });

    try {
      await Message.create(messageForDb);
      // console.log("Message saved to database:", messageForDb);
    } catch (error) {
      console.error("Error sending message:", error);
      return;
    }

    // console.log("New message sent to sockets:", messageForRealTime);
  });

  socket.on(TYPING, ({ chatId, members }) => {
    // console.log("TYPING start event received:", { chatId, members });
    const memberSockets = getSockets(members);
    // console.log("Member sockets for TYPING:", memberSockets);
    io.to(memberSockets).emit(TYPING, {
      chatId,
      sender: {
        _id: user._id,
        name: user.name,
      },
    });
  });
  socket.on(STOP_TYPING, ({ chatId, members }) => {
    // console.log("TYPING stop event received:", { chatId, members });
    const memberSockets = getSockets(members);
    // console.log("Member sockets for TYPING:", memberSockets);
    io.to(memberSockets).emit(STOP_TYPING, {
      chatId,
      sender: {
        _id: user._id,
        name: user.name,
      },
    });
  });

  socket.on(NEW_REQUEST, ({ receiverId }) => {
    const receiverSocketId = userSocketIds.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit(NEW_REQUEST, { receiverId });
    }
  });

  // Handle incoming messages
  socket.on("disconnect", () => {
    console.log("User disconnected");
    userSocketIds.delete(user._id.toString());
  });
});

// =======================
// Express Middleware
// =======================
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(cookieParser());

// =======================
// Database Connection
// =======================
connectDB();

// =======================
// API Routes
// =======================

app.use("/api/v1/user", UserAuthRoute);
app.use("/api/v1/chat", ChatRoute);
app.use("/api/v1/admin", AdminRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// =======================
// Server Start
// =======================
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export { io, userSocketIds };
