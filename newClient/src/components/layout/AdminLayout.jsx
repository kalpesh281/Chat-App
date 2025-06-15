import React from "react";
import { Box } from "@mui/material";
import SideBar from "./SideBar";

function AdminLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        bgcolor: "rgba(245, 245, 245, 0.5)",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          width: "20%",
          height: "100%",
          overflow: "auto",
          borderRight: `1px solid rgba(224, 224, 224, 0.7)`,
          bgcolor: "#ffffff",
          boxShadow: "inset -5px 0 15px rgba(0, 0, 0, 0.03)",
        }}
      >
        <SideBar />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: "80%" },
          height: "100%",
          bgcolor: "rgba(245, 245, 245, 0.5)",
          overflow: "auto",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(200, 200, 255, 0.05) 0%, transparent 50%)",
            backgroundSize: "100% 100%",
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 1,
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;
