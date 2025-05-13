import React from "react";
import { useSelector } from "react-redux";

function Message({ message }) {
  const { user, selectedUser } = useSelector((state) => state.auth);

  if (!user || !message) return null;

  const formattedTime = new Date(message.createdAt).toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );

  const isSentByCurrentUser = user.id === message.senderId;

  const bubbleStyle = isSentByCurrentUser
    ? "bg-white-800 border-white-700 text-black"
    : "bg-gray-800/50 border border-gray-600 text-gray-200";

  return (
    <div className={`chat ${isSentByCurrentUser ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src={
              isSentByCurrentUser
                ? user.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className={`chat-bubble rounded-lg ${bubbleStyle}`}>
        {message.message}
      </div>
      <div className="chat-footer flex items-center gap-2 text-gray-400 opacity-70 text-xs mt-1">
        <time>{formattedTime}</time>
      </div>
    </div>
  );
}

export default Message;
