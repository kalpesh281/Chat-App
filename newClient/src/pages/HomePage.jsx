import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { ChatBubbleOutline as ChatIcon } from "@mui/icons-material";
import AppLayout from "../components/layout/AppLayout";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          py: 5,
          px: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 3,
          background:
            "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.9))",
          backdropFilter: "blur(10px)",
          maxWidth: "80%",
        }}
      >
        <ChatIcon
          sx={{
            fontSize: 80,
            color: "primary.light",
            mb: 3,
            opacity: 0.8,
          }}
        />
        <Typography
          variant="h5"
          color="primary.main"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          Welcome to Chat App
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a friend from the left sidebar to start chatting
        </Typography>
      </Paper>
    </Box>
  );
};

export default AppLayout()(HomePage);
