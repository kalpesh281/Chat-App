import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { SocketServer } from "./constant/config";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    const newSocket = io(`${SocketServer}`, {
      transports: ["websocket"],
      withCredentials: true,
    });
    return newSocket;
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
