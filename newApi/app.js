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
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/MessageSchema.js";
import { socketAuthenticator } from "./middlewares/SocketAuthMiddleware.js";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
    Methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
  },
});

const PORT = process.env.PORT || 5001;
const userSocketIds = new Map();

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async (err) =>
    socketAuthenticator(err, socket, next)
  );
});

io.on("connection", (socket) => {
  const user = socket.user;
  // console.log("Socket connected:", user);
  userSocketIds.set(user._id.toString(), socket.id);
  // console.log("Client connected", userSocketIds);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    console.log("NEW_MESSAGE event received:", { chatId, members, message });

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
      console.log("Message saved to database:", messageForDb);
    } catch (error) {
      console.error("Error sending message:", error);
      return;
    }

    console.log("New message sent to sockets:", messageForRealTime);
  });

  // Handle incoming messages
  socket.on("disconnect", () => {
    console.log("User disconnected");
    userSocketIds.delete(user._id.toString());
  });
});

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
app.use("/api/v1/user", UserAuthRoute);
app.use("/api/v1/chat", ChatRoute);
app.use("/api/v1/admin", AdminRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export { io, userSocketIds };
