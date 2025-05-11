import React from "react";
import { BsCheckAll } from "react-icons/bs";

function Message({message}) {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
          />
        </div>
      </div>
      <div className="chat-bubble bg-gray-800/50 border border-gray-600 rounded-lg text-gray-200">
        {message?.message}
      </div>
      <div className="chat-footer flex items-center justify-between text-gray-400 opacity-70 text-xs mt-1">
        <time>12:45</time>
        <BsCheckAll className="text-blue-500" size={20}/>
      </div>
    </div>
  );
}

export default Message;
