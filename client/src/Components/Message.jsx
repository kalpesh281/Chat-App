import React from "react";
import { BsCheckAll } from "react-icons/bs";
import { useSelector } from "react-redux";

function Message({ message }) {
  const { user, selectedUser } = useSelector((state) => state.auth);

  // 🛡️ Guard clause: return nothing or placeholder if data isn't ready
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

      <div className="chat-bubble bg-gray-800/50 border border-gray-600 rounded-lg text-gray-200">
        {message.message}
      </div>

      <div className="chat-footer flex items-center gap-2 text-gray-400 opacity-70 text-xs mt-1">
        <time>{formattedTime}</time>
        <BsCheckAll className="text-blue-500" size={16} />
      </div>
    </div>
  );
}

export default Message;
