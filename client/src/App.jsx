import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PageNotFound from "./Components/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client";
import { setSocket } from "./Features/socketSlice";
import { setOnlineUsers } from "./Features/authSlice";

function App() {
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // If user exists, initialize socket connection
      const newSocket = io("http://localhost:5003", {
        transports: ["websocket"],
        query: { userId: user.id },
      });
      dispatch(setSocket(newSocket));

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Cleanup function to close socket on component unmount or user logout
      return () => {
        newSocket.close();
        dispatch(setSocket(null));
      };
    } else {
      // Handle case when user is logged out and socket is not needed
      if (socket) {
        socket.close(); // Ensure socket is closed
        dispatch(setSocket(null));
      }
    }
  }, [user, socket, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
