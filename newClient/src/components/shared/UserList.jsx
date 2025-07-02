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
  UserPlus as PersonAddIcon,
  UserMinus as PersonRemoveIcon,
} from "lucide-react";
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
                bgcolor: isAdded ? "red" : "rgba(25, 118, 210, 0.08)",
                color: isAdded ? "white" : "primary.main",
                transition: "all 0.2s",
                border: isAdded ? "2px solid white" : "2px solid transparent",
                "&:hover": {

                  bgcolor: isAdded ? "red" : "rgba(25, 118, 210, 0.15)",
                  color: "white",

                  transform: "scale(1.05)",
                },
              }}
            >
              {isAdded ? (
                <PersonRemoveIcon size={18} />
              ) : (
                <PersonAddIcon size={18} />
              )}
            </IconButton>
          )}
        </Box>
      }
    >
      <ListItemAvatar>
        <Avatar
          src={
            Array.isArray(user.avatar) && user.avatar[0]
              ? user.avatar[0]
              : undefined
          }
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
