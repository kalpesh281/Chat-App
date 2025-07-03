import React, { useRef, useEffect, useMemo } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  IconButton,
  Stack,
  Box,
  Paper,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { Paperclip as AttachFileIcon, Send as SendIcon } from "lucide-react";
import { InputBox, Button } from "../components/styles/StyledComponent";
import FileMenu from "../components/dialog/FileMenu";
import { sampleMessages } from "../components/data/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { useState } from "react";
import { NEW_MESSAGE, STOP_TYPING, TYPING } from "../constant/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useCallback } from "react";
import { useErrors, useSocketEvents } from "../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from "../redux/reducers/miscSlice";
import { removeNewMessageAlert } from "../redux/reducers/chatSlice";
import { motion } from "framer-motion";
import Loader from "../components/layout/Loader";
import { useNavigate } from "react-router-dom";

function ChatPage({ chatId }) {
  const containerRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [isLoadingOldMessages, setIsLoadingOldMessages] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  const dispatch = useDispatch();
  const socket = getSocket();

  const user = useSelector((state) => state.auth.user);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessageChunk = useGetMessagesQuery({ chatId, page });

  useEffect(() => {
    setIsLoadingOldMessages(oldMessageChunk.isLoading);
  }, [oldMessageChunk.isLoading]);

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

  const members = chatDetails.data?.chat.members;

  const submitMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, {
      chatId,
      members,
      message,
    });

    setMessage("");
    setShouldScrollToBottom(true);
  };

  useEffect(() => {
    dispatch(removeNewMessageAlert({ chatId }));
    return () => {
      setMessages([]);
      setOldMessages([]);
      setPage(1);
      setShouldScrollToBottom(false);
      setIsLoadingOldMessages(false);
    };
  }, [chatId]);

  const [typingUser, setTypingUser] = useState(null);

  const newMessagesHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prevMessages) => [...prevMessages, data.message]);
      setShouldScrollToBottom(true);
    },
    [chatId]
  );

  const startTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      // Only set typingUser if it's not the current user
      if (data.sender && data.sender._id !== user?._id) {
        setUserTyping(true);
        setTypingUser(data.sender);
        // Auto scroll to show typing indicator
        setShouldScrollToBottom(true);
      }
    },
    [chatId, user?._id]
  );

  const stopTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      // Only clear if the sender is not the current user
      if (data.sender && data.sender._id !== user?._id) {
        setUserTyping(false);
        setTypingUser(null);
      }
    },
    [chatId, user?._id]
  );

  useEffect(() => {
    if (!chatDetails.data.chat) {
      return navigate("/");
    }
  }, [chatDetails.data]);

  const eventHandler = {
    [NEW_MESSAGE]: newMessagesHandler,
    [TYPING]: startTypingHandler,
    [STOP_TYPING]: stopTypingHandler,
  };

  useSocketEvents(socket, eventHandler);
  useErrors(error);

  const allMessages = [...oldMessages, ...messages];

  const prevOldMessagesLength = useRef(0);
  const prevScrollHeight = useRef(0);
  const prevScrollTop = useRef(0);
  const isRestoringScroll = useRef(false);

  useEffect(() => {
    if (containerRef.current && page > 1) {
      prevScrollHeight.current = containerRef.current.scrollHeight;
      prevScrollTop.current = containerRef.current.scrollTop;
      isRestoringScroll.current = true;
    }
  }, [page]);

  useEffect(() => {
    if (
      containerRef.current &&
      oldMessages.length > prevOldMessagesLength.current &&
      !oldMessageChunk.isLoading &&
      isRestoringScroll.current
    ) {
      const newScrollTop =
        containerRef.current.scrollHeight -
        prevScrollHeight.current +
        prevScrollTop.current;

      containerRef.current.scrollTop = newScrollTop;
      isRestoringScroll.current = false;
    }
    prevOldMessagesLength.current = oldMessages.length;
  }, [oldMessages.length, oldMessageChunk.isLoading]);

  useEffect(() => {
    if (
      containerRef.current &&
      shouldScrollToBottom &&
      !isRestoringScroll.current
    ) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
          setShouldScrollToBottom(false);
        }
      }, 50);
    }
  }, [allMessages.length, shouldScrollToBottom, userTyping]);

  useEffect(() => {
    if (userTyping && typingUser && typingUser._id !== user?._id) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [userTyping, typingUser, user?._id]);

  // Initial scroll to bottom when chat loads
  useEffect(() => {
    if (containerRef.current && allMessages.length > 0 && page === 1) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [chatDetails.isLoading, allMessages.length, page]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const messageOnChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    if (!IamTyping) {
      socket.emit(TYPING, {
        chatId,
        members,
      });
      setIamTyping(true);
    }
    if (value.trim()) {
      e.target.style.height = "auto";
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, {
        chatId,
        members,
      });
      setIamTyping(false);
    }, [1500]);
  };

  function TypingIndicator() {
    // Left-aligned, styled like a received message bubble
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          pl: 0,
          pb: 0.5,
        }}
      >
        <Box
          sx={{
            background: "#fffbe6", // match left/receiver bubble
            borderRadius: "16px 16px 16px 4px",
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            minWidth: 44,
            minHeight: 32,
            maxWidth: "60%",
            border: "1px solid #f5e9c6",
            ml: 0.5,
          }}
        >
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              height: 12,
            }}
            aria-label="User is typing"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#e0b800", // yellow/dark accent
                  display: "inline-block",
                  margin: "0 2px",
                }}
                animate={{
                  y: [0, -6, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </Box>
      </Box>
    );
  }

  return chatDetails.isLoading ? (
    <Loader />
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
        {/* Enhanced loader at the top when loading old messages */}
        {isLoadingOldMessages && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 1,
              position: "sticky",
              top: 0,
              zIndex: 2,
              background: "rgba(245, 247, 251, 0.9)",
              backdropFilter: "blur(8px)",
              borderRadius: 1,
              padding: 1,
              gap: 1,
            }}
          >
            <CircularProgress size={20} />
            <Box
              sx={{
                fontSize: "0.875rem",
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              Loading messages...
            </Box>
          </Box>
        )}

        {/* Alternative skeleton loader for more messages */}
        {isLoadingOldMessages && (
          <Stack spacing={1} sx={{ mb: 2 }}>
            {[1, 2, 3].map((i) => (
              <Box key={i} sx={{ display: "flex", gap: 1 }}>
                <Skeleton variant="circular" width={32} height={32} />
                <Box sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton
                    variant="rectangular"
                    width="40%"
                    height={40}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        )}

        {allMessages.map((i, idx) => (
          <MessageComponent
            key={i._id || `msg-${idx}`}
            message={i}
            user={user}
          />
        ))}

        {/* Typing indicator */}
        {/* Only show if someone else is typing */}
        {userTyping && typingUser && typingUser._id !== user?._id && (
          <TypingIndicator />
        )}
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
              onChange={messageOnChange}
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
