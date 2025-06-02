import React, { memo } from "react";
import { Link } from "../styles/StyledComponent";
import { Box, Stack, Typography, Badge } from "@mui/material";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: 0,
        display: "block",
        textDecoration: "none",
        marginBottom: "4px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          backgroundColor: sameSender ? "#e3f2fd" : "transparent",
          color: "text.primary",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: sameSender ? "#bbdefb" : "#f5f5f5",
            transform: "translateY(-1px)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          },
          position: "relative",
          borderLeft: sameSender
            ? "4px solid #1976d2"
            : "4px solid transparent",
        }}
      >
        {/* Avatar Section with enhanced styling */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexShrink: 0,
            minWidth: 48,
            height: 48,
            mr: 2,
            position: "relative",
          }}
        >
          <AvatarCard avatar={avatar} />
          {isOnline && (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#4caf50",
                position: "absolute",
                bottom: 3,
                right: 5,
                border: "2px solid white",
                zIndex: 2,
                boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.2)",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(76, 175, 80, 0.4)" },
                  "70%": { boxShadow: "0 0 0 6px rgba(76, 175, 80, 0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(76, 175, 80, 0)" },
                },
              }}
            />
          )}
        </Box>

        {/* Content Section - Simplified */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Typography
            variant="body1"
            fontWeight={sameSender ? "500" : "400"}
            color={sameSender ? "primary.dark" : "text.primary"}
            noWrap
            sx={{
              fontSize: "0.95rem",
              letterSpacing: "0.02em",
            }}
          >
            {name}
            {groupChat && (
              <Box
                component="span"
                sx={{
                  ml: 1,
                  px: 1,
                  py: 0.2,
                  borderRadius: "4px",
                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                  color: "primary.main",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Group
              </Box>
            )}
          </Typography>

          {newMessageAlert && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                background: "rgba(25, 118, 210, 0.1)",
                borderRadius: "12px",
                padding: "2px 8px",
                ml: 1,
              }}
            >
              <Typography
                variant="caption"
                color="primary"
                fontWeight="bold"
                sx={{ mr: 0.5, fontSize: "0.75rem" }}
              >
                {newMessageAlert.count}
              </Typography>
              <Typography
                variant="caption"
                color="primary.dark"
                sx={{ fontSize: "0.7rem" }}
              >
                New
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Link>
  );
};

export default memo(ChatItem);
