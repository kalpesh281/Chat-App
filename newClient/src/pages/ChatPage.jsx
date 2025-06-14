import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack, Box, Paper } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox, Button } from "../components/styles/StyledComponent";

function ChatPage() {
  const containerRef = useRef(null);
  return (
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
        {/* Messages will appear here */}
      </Stack>

      {/* Input form area */}
      <Paper
        elevation={3}
        component="form"
        sx={{
          p: 1,
          borderTop: "1px solid #e0e0e0",
          position: "sticky",
          bottom: 0,
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <IconButton color="primary" sx={{ flexShrink: 0 }}>
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type a message..." sx={{ flexGrow: 1 }} />

          <IconButton
            color="primary"
            sx={{
              backgroundColor: "#007bff",
              color: "white",
              "&:hover": { backgroundColor: "#0069d9" },
              flexShrink: 0,
            }}
            type="submit"
          >
            <SendIcon  />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
}

export default AppLayout()(ChatPage);
