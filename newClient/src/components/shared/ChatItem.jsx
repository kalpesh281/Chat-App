import React, { memo } from "react";
import { Link } from "../styles/StyledComponent";
import { Box, Stack, Typography, Badge } from "@mui/material";
import AvatarCard from "./AvatarCard";

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
          {/* Pass the first letter to AvatarCard */}
          <AvatarCard avatar={avatar} firstLetter={firstLetter} name={name} />
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

            {showNewMessageIndicators &&
              newMessageAlert &&
              newMessageAlert.count > 0 && (
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
                    marginLeft: "auto",
                  }}
                >
                  {newMessageAlert.count}
                </Typography>
              )}
          </Stack>

          {showNewMessageIndicators &&
            newMessageAlert &&
            newMessageAlert.count > 0 && (
              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 400,
                  mt: 0.5,
                  display: "block",
                  padding: "2px 4px",
                  borderRadius: "4px",
                }}
              >
                New messages
              </Typography>
            )}
        </Stack>
      </Box>
    </Link>
  );
};

export default memo(ChatItem);
