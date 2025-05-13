// socket/socket.js
const { Server } = require("socket.io");

const userSocketMap = {};
let io; 

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const getIO = () => io;

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
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

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

module.exports = { initializeSocket, getReceiverSocketId, getIO };
