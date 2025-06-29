import React, { useRef, useEffect, useMemo } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack, Box, Paper, Skeleton } from "@mui/material";
import { Paperclip as AttachFileIcon, Send as SendIcon } from "lucide-react"; // lucide-react icons
import { InputBox, Button } from "../components/styles/StyledComponent";
import FileMenu from "../components/dialog/FileMenu";
import { sampleMessages } from "../components/data/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { useState } from "react";
import { NEW_MESSAGE } from "../constant/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useCallback } from "react";
import { useErrors, useSocketEvents } from "../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from "../redux/reducers/miscSlice";

function ChatPage({ chatId }) {
  const containerRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const dispatch = useDispatch();
  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessageChunk = useGetMessagesQuery({ chatId, page });

  // Use infinite scroll to load more messages when scrolled to the top
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessageChunk.data?.totalPages,
    page,
    setPage,
    oldMessageChunk.data?.messages || []
  );

  const error = useMemo(
    () => [
      {
        isError: chatDetails.isError,
        error: chatDetails.error,
      },
      {
        isError: oldMessageChunk.isError,
        error: oldMessageChunk.error,
      },
    ],
    [
      chatDetails.isError,
      chatDetails.error,
      oldMessageChunk.isError,
      oldMessageChunk.error,
    ]
  );

  console.log("Old message chunk:", oldMessages);
  // console.log("Chat details:", chatDetails.data);

  const members = chatDetails.data?.chat.members;

  const submitMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Emit the message to the server
    socket.emit(NEW_MESSAGE, {
      chatId,
      members,
      message,
    });

    setMessage("");
    // console.log("Message submitted:", message);
  };

  const newMessagesHandler = useCallback((data) => {
    setMessages((prevMessages) => [...prevMessages, data.message]);
    // console.log("New message received:", data);
  });

  const eventHandler = {
    [NEW_MESSAGE]: newMessagesHandler,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(error);

  // Fix: Default to empty array if messages is undefined
  const allMessages = [...oldMessages, ...messages];

  // Scroll to bottom when allMessages changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [allMessages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      e.target.form.requestSubmit();
    }
  };
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
    console.log("File menu opened");
  };

  const user = useSelector((state) => state.auth.user);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Chat messages area */}
      <Stack
        ref={containerRef}
        bgcolor="#f5f7fb"
        boxSizing="border-box"
        padding={"1rem"}
        spacing={"1rem"}
        flexGrow={1}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      {/* Input form area */}
      <Paper
        elevation={3}
        sx={{
          p: 1,
          borderTop: "1px solid #e0e0e0",
          position: "sticky",
          bottom: 0,
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <form style={{ width: "100%" }} onSubmit={submitMessage}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <IconButton
              color="primary"
              sx={{ flexShrink: 0 }}
              onClick={handleFileOpen}
            >
              <AttachFileIcon size={22} />
            </IconButton>

            <InputBox
              as="textarea"
              minRows={1}
              maxRows={4}
              placeholder="Type a message..."
              sx={{
                flexGrow: 1,
                resize: "none",
                overflowY: "auto",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <IconButton
              color="primary"
              sx={{
                backgroundColor: message.trim() ? "#007bff" : "#e0e0e0",
                color: message.trim() ? "white" : "#9e9e9e",
                "&:hover": {
                  backgroundColor: message.trim() ? "#0069d9" : "#e0e0e0",
                },
                flexShrink: 0,
              }}
              type="submit"
              disabled={!message.trim()}
            >
              <SendIcon size={22} />
            </IconButton>
          </Stack>
        </form>
      </Paper>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Box>
  );
}

export default AppLayout()(ChatPage);
