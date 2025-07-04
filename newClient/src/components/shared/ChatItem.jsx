import React, { memo, useState } from "react";
import { Link } from "../styles/StyledComponent";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVertical, Circle } from "lucide-react";
import AvatarCard from "./AvatarCard";

// Utility to generate a consistent color from a string
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 55%)`;
}

const ChatItem = ({
  avatar,
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  const showNewMessageIndicators = !sameSender;

  // Extract first letter of name for the avatar
  const firstLetter = name ? name.charAt(0).toUpperCase() : "";

  // Generate a color for avatar (user or group)
  const avatarColor = stringToColor(name || "");

  // Menu state for three-dot icon
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (e) => {
    handleMenuClose();
    if (handleDeleteChat) handleDeleteChat(e, _id, groupChat);
  };

  const handleLeaveGroup = (e) => {
    handleMenuClose();
    if (handleDeleteChat) handleDeleteChat(e, _id, true); // You can differentiate in handler if needed
  };

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
      // Remove context menu for delete, now handled by menu
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
        {/* Show colored avatar for both group and user if no avatar image */}
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
          {!avatar || groupChat ? (
            <Box
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: groupChat ? "6px" : "50%",
                backgroundColor: avatarColor,
                color: "white",
                fontWeight: 700,
                fontSize: "1.1rem",
                userSelect: "none",
                boxShadow: "0 1px 4px rgba(25, 118, 210, 0.08)",
              }}
            >
              {firstLetter}
            </Box>
          ) : (
            <AvatarCard avatar={avatar} firstLetter={firstLetter} name={name} />
          )}
          {isOnline && (
            <Circle
              size={12}
              color="#4caf50"
              fill="#4caf50"
              style={{
                position: "absolute",
                bottom: 3,
                right: 5,
                border: "2px solid white",
                zIndex: 2,
                boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.2)",
              }}
            />
          )}
        </Box>

        <Stack
          sx={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Typography
              variant="body1"
              fontWeight={sameSender ? "500" : "400"}
              color={sameSender ? "primary.dark" : "text.primary"}
              noWrap
              sx={{
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
                maxWidth: "75%",
              }}
            >
              {name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
                aria-label="more"
              >
                <MoreVertical size={20} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {!groupChat && (
                  <MenuItem onClick={handleDelete}>Delete Chat</MenuItem>
                )}
                {groupChat && (
                  <MenuItem onClick={handleLeaveGroup}>Leave Group</MenuItem>
                )}
              </Menu>
            </Box>
          </Stack>

          {showNewMessageIndicators &&
            newMessageAlert &&
            newMessageAlert.count > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <Typography
                  variant="caption"
                  color="primary"
                  fontWeight="bold"
                  sx={{
                    fontSize: "0.8rem",
                    bgcolor: "primary.main",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  {newMessageAlert.count}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 400,
                    display: "block",
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                >
                  New messages
                </Typography>
              </Box>
            )}
        </Stack>
      </Box>
    </Link>
  );
};

export default memo(ChatItem);
