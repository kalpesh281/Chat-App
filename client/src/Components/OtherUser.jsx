import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../Features/authSlice";

function OtherUser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((state) => state.auth);

  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={selectedUserHandler}
        className={`${
          selectedUser?._id === user?._id
            ? "bg-zinc-200 text-black"
            : "text-white"
        } flex gap-3 items-center hover:text-black hover:bg-zinc-200 rounded p-2 cursor-pointer`}
      >
        {/* Avatar with custom online indicator */}
        <div className="relative">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={user?.profilePhoto || "https://i.pravatar.cc/300"}
            alt="user-profile"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        {/* User Details */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p className="font-semibold">{user?.fullName || "Unknown User"}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}

export default OtherUser;
