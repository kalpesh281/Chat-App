import React from "react";
import { Typography, Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function NotFoundPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: `linear-gradient(145deg, #f8f9fa 0%, #f1f3f5 100%)`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        textAlign: "center",
      }}
    >
      {/* Error icon */}
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <ErrorOutlineIcon sx={{ color: "white", fontSize: 70 }} />
      </Box>

      {/* 404 title */}
      <Typography
        variant="h1"
        component="h1"
        fontWeight="bold"
        sx={{
          fontSize: { xs: "7rem", sm: "10rem" },
          lineHeight: 1,
          letterSpacing: "-5px",
          mb: 3,
          background: `linear-gradient(90deg, ${theme.palette.error.dark}, ${theme.palette.error.main} 50%, ${theme.palette.error.light})`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shine 3s linear infinite",
          "@keyframes shine": {
            to: { backgroundPosition: "200% center" },
          },
          position: "relative",
          zIndex: 2,
        }}
      >
        404
      </Typography>

      {/* Page not found text */}
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        color="text.primary"
        sx={{ mb: 2, position: "relative", zIndex: 2 }}
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 5, maxWidth: "500px", position: "relative", zIndex: 2 }}
      >
        We're sorry, but the page you were looking for doesn't exist or might
        have been moved.
      </Typography>

      {/* Go back button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        size="large"
        onClick={() => navigate("/")}
        sx={{
          py: 1.5,
          px: 4,
          borderRadius: 2,
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
            transform: "translateY(-2px)",
          },
          position: "relative",
          zIndex: 2,
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
