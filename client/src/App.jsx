import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PageNotFound from "./Components/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateSocketStatus } from "./Features/socketSlice";
import { setOnlineUsers } from "./Features/authSlice";
import { initializeSocket, closeSocket } from "./Components/SocketManager";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // If user exists, initialize socket connection
      const socket = initializeSocket(user.id);

      // Update Redux with serializable socket status
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

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Immediately set as connected if socket is already connected
      if (socket.connected) {
        dispatch(
          updateSocketStatus({
            connected: true,
            id: socket.id,
          })
        );
      }
      // Cleanup function to close socket on component unmount or user logout
      return () => {
        closeSocket();
        dispatch(updateSocketStatus({ connected: false, id: null }));
      };
    } else {
      // Handle case when user is logged out and socket is not needed
      closeSocket();
      dispatch(updateSocketStatus({ connected: false, id: null }));
    }
  }, [user, dispatch]); // Remove socket from dependencies

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
