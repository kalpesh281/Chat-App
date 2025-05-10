import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";

function MessageContainer() {
  return (
    <div className="w-full h-full flex flex-col p-1 rounded-lg">
      {/* Header Section */}
      <div className="flex items-center gap-4 p-2 rounded-lg transition duration-200 cursor-pointer w-full">
        <img
          src="https://i.pinimg.com/736x/3b/37/58/3b37587e833126e35d212355c0d8770e.jpg"
          alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-gray-500 object-cover"
        />
        <span className="text-white font-medium">Muzan</span>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-500 my-2"></div>

      {/* Messages Section */}
      <div className="flex-1 overflow-auto">
        <Messages />
      </div>

      {/* Input Section */}
      <div className="w-full mt-auto">
        <SendInput />
      </div>
    </div>
  );
}

export default MessageContainer;
