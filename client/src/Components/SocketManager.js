import io from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (userId) => {
  if (socketInstance) {
    socketInstance.close();
  }

  socketInstance = io("http://localhost:5003", {
    transports: ["websocket"],
    query: { userId },
  });

  return socketInstance;
};

export const getSocket = () => socketInstance;

export const closeSocket = () => {
  if (socketInstance) {
    socketInstance.close();
    socketInstance = null;
  }
};
