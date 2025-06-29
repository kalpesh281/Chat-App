import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { MessageCircle } from "lucide-react"; // replaced icon import
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
        <MessageCircle
          style={{
            fontSize: 80,
            color: "#90caf9",
            marginBottom: "24px",
            opacity: 0.8,
            width: 80,
            height: 80,
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
