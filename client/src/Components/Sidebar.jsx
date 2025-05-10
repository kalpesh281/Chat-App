import React from "react";
import { BiSearchAlt2, BiLogOut } from "react-icons/bi";
import OtherUsers from "./OtherUsers";

function Sidebar() {
  return (
    <>
      <div className="border-r border-slate-500 p-4 flex flex-col h-full">
        <form className="flex items-center gap-2 mb-4">
          <input
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
              src="https://i.pinimg.com/564x/43/bf/0f/43bf0ff338132ce31868ecf1020fd882.jpg"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
            />
            <span className="text-white font-medium">@myusername</span>
          </div>
          <button className="text-white hover:text-red-500 transition duration-200">
            <BiLogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
