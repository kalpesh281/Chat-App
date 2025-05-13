// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PageNotFound from "./Components/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setOnlineUsers, setUnreadMessageCounts } from "./Features/authSlice";
import { updateSocketStatus } from "./Features/socketSlice";
import { initializeSocket, closeSocket } from "./Components/SocketManager";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // If user exists, initialize socket connection
      const socket = initializeSocket(user.id);

      // Update Redux with socket status
      socket.on("connect", () => {
        dispatch(
          updateSocketStatus({
            connected: true,
            id: socket.id,
          })
        );
      });

      socket.on("disconnect", () => {
        dispatch(
          updateSocketStatus({
            connected: false,
            id: null,
          })
        );
      });

      // Listen for online users updates
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Listen for unread message counts when logging in
      socket.on("unreadMessageCounts", (counts) => {
        dispatch(setUnreadMessageCounts(counts));
      });

      // If socket is already connected
      if (socket.connected) {
        dispatch(
          updateSocketStatus({
            connected: true,
            id: socket.id,
          })
        );
      }

      // Cleanup function
      return () => {
        closeSocket();
        dispatch(updateSocketStatus({ connected: false, id: null }));
      };
    } else {
      // Handle logout case
      closeSocket();
      dispatch(updateSocketStatus({ connected: false, id: null }));
    }
  }, [user, dispatch]);

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
