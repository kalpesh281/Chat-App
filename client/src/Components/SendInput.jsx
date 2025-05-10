import React from "react";
import { IoSend } from "react-icons/io5";

function SendInput() {
  return (
    <form className="w-full  p-2">
      <div className="w-full flex items-center gap-3">
        {/* Input Field */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type your message..."
            className="border text-sm rounded-lg block w-full p-3 border-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        {/* Send Button */}
        <div>
          <button
            type="submit"
            className="flex items-center justify-center w-14 h-13 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <IoSend className="text-lg" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default SendInput;
