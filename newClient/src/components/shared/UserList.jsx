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
import { PersonAdd as PersonAddIcon } from "@mui/icons-material";
import React, { memo } from "react";

const UserList = ({
  user,
  handler,
  handlerIsLoading,
  handleIsDisabled = false,
  isAdded = false,
}) => {
  return (
    <ListItem
      alignItems="center"
      sx={{
        py: 1,
        px: 2,
        "&:hover": {
          "& .add-friend-btn": {
            opacity: 1,
          },
        },
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
              className="add-friend-btn"
              edge="end"
              disabled={handleIsDisabled || isAdded}
              onClick={() => handler(user._id)}
              sx={{
                bgcolor: isAdded ? "success.light" : "rgba(25, 118, 210, 0.08)",
                color: isAdded ? "white" : "primary.main",
                opacity: { xs: 1, sm: 0.7 },
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: isAdded
                    ? "success.main"
                    : "rgba(25, 118, 210, 0.15)",
                  transform: "scale(1.05)",
                },
              }}
            >
              <PersonAddIcon fontSize="small" />
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
