import React from "react";

function OtherUser() {
  return (
    <>
      <div
        className="flex items-center gap-4  hover:bg-white/6 rounded-lg transition 
      
      duration-200 cursor-pointer"
      >
        <img
          src="https://i.pinimg.com/736x/3b/37/58/3b37587e833126e35d212355c0d8770e.jpg"
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-gray-500 object-cover"
        />
        <span className="text-white font-medium">Muzan</span>
      </div>
      <div className="divider"></div>
    </>
  );
}

export default OtherUser;
