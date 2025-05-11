import React, { useEffect, useState } from "react";
import { BiSearchAlt2, BiLogOut } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import { useDispatch, useSelector } from "react-redux";
import { logout, setOtherUsers, setSelectedUser } from "../Features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, otherUsers } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.success("Logout successful!");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const searchHandle = async (e) => {
    e.preventDefault();
    console.log("Searching for:", search); // Debugging line to see search term

    // Check if otherUsers is an array
    if (Array.isArray(otherUsers)) {
      console.log("Other Users: ", otherUsers); // Debugging line to see the users array

      // Case insensitive search logic
      const conversationUser = otherUsers.find((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );

      if (conversationUser) {
        dispatch(setSelectedUser(conversationUser)); // Select the user if found
      } else {
        toast.error("User not found"); // Show error toast when user is not found
      }
    } else {
      console.error("otherUsers is not an array");
    }
  };

  return (
    <>
      <div className="border-r border-slate-500 p-4 flex flex-col h-full">
        <form onSubmit={searchHandle} className="flex items-center gap-2 mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered rounded-full w-full bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 px-4 py-2"
            type="text"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="btn bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full flex items-center justify-center"
          >
            <BiSearchAlt2 className="w-5 h-5" />
          </button>
        </form>
        <div className="divider px-1"></div>
        <OtherUsers />

        <div className="flex items-center justify-between p-2 mt-auto border-t border-slate-500">
          <div className="flex items-center gap-4">
            <img
              src={user?.profilePhoto || "https://your-fallback-image-url.com"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
            />
            <span className="text-white font-medium">
              @{user?.userName || "Guest"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-white hover:text-red-500 transition duration-200"
          >
            <BiLogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
