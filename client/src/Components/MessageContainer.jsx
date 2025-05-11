import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

function MessageContainer() {
  const selectedUser = useSelector((state) => state.auth.selectedUser);
  return (
    <div className="w-full h-full flex flex-col p-1 rounded-lg">
      {/* Header Section */}
      <div className="flex items-center gap-4 p-2 rounded-lg transition duration-200 cursor-pointer w-full">
        <img
          src={selectedUser?.profilePhoto}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-gray-500 object-cover"
        />
        <span className="text-white font-medium">{selectedUser?.fullName}</span>
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
  );
}

export default MessageContainer;
