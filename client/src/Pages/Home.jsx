import React from "react";
import Sidebar from "../Components/Sidebar";
import MessageContainer from "../Components/MessageContainer";

function Home() {
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <div className="flex sm:h-[450px] md:h-[550px] w-full max-w-5xl rounded-xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20">
          <div className="w-2/5">
            <Sidebar />
          </div>
          <div className="w-4/5">
            <MessageContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
