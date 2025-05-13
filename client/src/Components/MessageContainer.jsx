import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSelectedUser } from "../Features/authSlice";

function MessageContainer() {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.auth.selectedUser);
  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null)); 
    };
  }, []);

  return (
    <>
      {selectedUser !== null ? (
        <div className="w-full h-full flex flex-col p-1 rounded-lg">
          {/* Header Section */}
          <div className="flex items-center gap-4 p-2 rounded-lg transition duration-200 cursor-pointer w-full">
            <img
              src={selectedUser?.profilePhoto}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-gray-500 object-cover"
            />
            <span className="text-white font-medium">
              {selectedUser?.fullName}
            </span>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-500 my-2"></div>

          {/* Messages Section - changed to flex with flex-col and justify-end */}
          <div className="flex-1 overflow-auto flex flex-col justify-end">
            <Messages />
          </div>

          {/* Input Section */}
          <div className="w-full">
            <SendInput />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z"
              />
            </svg>
            <h2 className="text-xl font-semibold">No Conversation Selected</h2>
            <p className="text-sm mt-1 text-gray-500">
              Please choose a user from the list to start chatting.
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default MessageContainer;
