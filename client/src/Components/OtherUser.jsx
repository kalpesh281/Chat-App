import React from "react";

function OtherUser(props) {
  const otherUser = props.user;
  return (
    <>
      <div
        className="flex items-center gap-4  hover:bg-white/6 rounded-lg transition 
      
      duration-200 cursor-pointer"
      >
        <img
          src={otherUser.profilePhoto}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-gray-500 object-cover"
        />
        <span className="text-white font-medium">{otherUser.fullName}</span>
      </div>
      <div className="divider"></div>
    </>
  );
}

export default OtherUser;
