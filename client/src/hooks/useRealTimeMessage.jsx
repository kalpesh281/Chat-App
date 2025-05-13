// hooks/useRealTimeMessage.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../Features/messageSlice";
import { getSocket } from "../Components/SocketManager";

const useRealTimeMessage = () => {
  const { connected } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (connected) {
      const socket = getSocket();

      const handleNewMessage = (newMessage) => {
        dispatch(addMessage(newMessage));
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [connected, dispatch]);
};

export default useRealTimeMessage;
