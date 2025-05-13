// hooks/useRealTimeMessage.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../Features/messageSlice";
import { updateUnreadMessageCount } from "../Features/authSlice";
import { getSocket } from "../Components/SocketManager";

const useRealTimeMessage = () => {
  const { connected } = useSelector((store) => store.socket);
  const { selectedUser, unreadMessageCounts } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (connected) {
      const socket = getSocket();

      const handleNewMessage = (newMessage) => {
        dispatch(addMessage(newMessage));

        // Only update unread count if the message is not from the currently selected user
        if (!selectedUser || selectedUser._id !== newMessage.senderId) {
          const senderId = newMessage.senderId;
          const currentCount = unreadMessageCounts[senderId] || 0;
          dispatch(
            updateUnreadMessageCount({
              senderId,
              count: currentCount + 1,
            })
          );
        }
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [connected, selectedUser, unreadMessageCounts, dispatch]);
};

export default useRealTimeMessage;
