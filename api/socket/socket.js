// socket/socket.js
const { Server } = require("socket.io");
const userSocketMap = {};
// Add storage for unread messages
const unreadMessages = {};
let io;

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const getIO = () => io;

// Add this new function to track messages sent to offline users
const incrementUnreadCount = (userId, senderId) => {
  if (!unreadMessages[userId]) {
    unreadMessages[userId] = {};
  }

  if (!unreadMessages[userId][senderId]) {
    unreadMessages[userId][senderId] = 0;
  }

  unreadMessages[userId][senderId]++;
};

// Add function to retrieve unread counts
const getUnreadCounts = (userId) => {
  return unreadMessages[userId] || {};
};

// Add function to clear unread counts when user views messages
const clearUnreadCount = (userId, senderId) => {
  if (unreadMessages[userId] && unreadMessages[userId][senderId]) {
    unreadMessages[userId][senderId] = 0;
  }
};

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId) {
      socket.userId = userId;
      userSocketMap[userId] = socket.id;

      // Send unread message counts when user connects
      if (unreadMessages[userId]) {
        socket.emit("unreadMessageCounts", unreadMessages[userId]);
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle clearing unread messages
    socket.on("clearUnreadMessages", (senderId) => {
      if (socket.userId && senderId) {
        clearUnreadCount(socket.userId, senderId);
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
      if (socket.userId) {
        delete userSocketMap[socket.userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });

  return io;
};

module.exports = {
  initializeSocket,
  getReceiverSocketId,
  getIO,
  incrementUnreadCount,
  getUnreadCounts,
  clearUnreadCount,
};
