import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
} from "@mui/icons-material";
import React, { memo } from "react";

const UserList = ({
  user,
  handler,
  handlerIsLoading,
  handleIsDisabled = false,
  isAdded = false,
  styling = {},
}) => {
  return (
    <ListItem
      alignItems="center"
      sx={{
        py: 1,
        px: 2,
        "&:hover": {
          "& .user-action-btn": {
            opacity: 1,
          },
        },
        ...styling,
      }}
      secondaryAction={
        <Box>
          {handlerIsLoading ? (
            <CircularProgress
              size={24}
              thickness={4}
              sx={{ color: "#1976d2" }}
            />
          ) : (
            <IconButton
              className="user-action-btn"
              edge="end"
              disabled={handleIsDisabled}
              onClick={() => handler(user._id)}
              sx={{
                bgcolor: isAdded ? "#ff4d4f" : "rgba(25, 118, 210, 0.08)",
                color: isAdded ? "white" : "primary.main",
                opacity: { xs: 1, sm: 0.7 },
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: isAdded
                    ? "#f5222d"
                    : "rgba(25, 118, 210, 0.15)",
                  transform: "scale(1.05)",
                },
              }}
            >
              {isAdded ? (
                <PersonRemoveIcon fontSize="small" />
              ) : (
                <PersonAddIcon fontSize="small" />
              )}
            </IconButton>
          )}
        </Box>
      }
    >
      <ListItemAvatar>
        <Avatar
          src={user.avatar[0]}
          alt={user.name}
          sx={{
            width: 40,
            height: 40,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: "2px solid white",
          }}
        >
          {user.name ? user.name[0].toUpperCase() : "U"}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={
          <Typography variant="body1" fontWeight={500} sx={{ lineHeight: 1.2 }}>
            {user.name}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default memo(UserList);
