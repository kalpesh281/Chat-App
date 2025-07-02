
import React, { use, useCallback, useEffect } from "react";

import Header from "./Header";
import { Grid, Typography, Box } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../data/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatQuery } from "../../redux/api/api";
import toast from "react-hot-toast";

import { useErrors, useSocketEvents } from "../../hooks/hooks";
import { getSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../../constant/events";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementNotificationCount,
  setNewMessageAlert,
} from "../../redux/reducers/chatSlice";
import { getOrSaveFromLocalStorage } from "../../libs/features";
import Loader from "./Loader";


const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;


    const dispatch = useDispatch();

    const socket = getSocket();

    // console.log("Socket instance:", socket);

    const { isLoading, data, isError, error, refetch } = useMyChatQuery("");

    // Defensive selector to avoid crash if state.chat is undefined
    const { newMessageAlert } = useSelector((state) => state.chat);

  



    useErrors([
      {
        isError,
        error,
      },
    ]);


    useEffect(() => {
      getOrSaveFromLocalStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessageAlert,
      });
    }, [newMessageAlert]);


    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      // console.log("Delete chat with ID:", chatId);
    };

    const newMessagesAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessageAlert(data));
      },
      [chatId]
    );
    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);

    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
    };

    useSocketEvents(socket, eventHandler);

    return (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#f9fafb",
        }}
      >
        <Header />

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "25%",
              bgcolor: "#ffffff",
              height: "100%",
              overflow: "auto",
              borderRight: "1px solid #e0e0e0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                background: "linear-gradient(180deg, #ffffff, #fafafa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                color="primary.dark"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                Conversations
              </Typography>
              <Box
                sx={{
                  fontSize: "0.75rem",
                  color: "text.secondary",
                  background: "rgba(25, 118, 210, 0.08)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 10,
                  fontWeight: 500,
                }}
              >
                {data?.chats?.length} Chats
              </Box>
            </Box>

            <Box
              sx={{
                overflowY: "auto",
                flexGrow: 1,
                px: 1.5,
                py: 1,
                background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)",
              }}
            >
              {isLoading ? (

                <Loader />

              ) : (
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}

                  newMessagesAlert={newMessageAlert}

 
                />
              )}
            </Box>
          </Box>

          <Box
            sx={{
              width: "45%",
              bgcolor: "#ffffff",
              height: "100%",
              overflow: "auto",
              borderRight: "1px solid #e0e0e0",
            }}
          >
            <WrappedComponent {...props} chatId={chatId} />
          </Box>

          <Box
            sx={{
              width: "30%",
              bgcolor: "#ffffff",
              p: 2,
              height: "100%",
              overflow: "auto",
              display: { xs: "none", md: "block" },
            }}
          >
            <Profile />
          </Box>
        </Box>
      </Box>
    );
  };
};

export { AppLayout };
export default AppLayout;
