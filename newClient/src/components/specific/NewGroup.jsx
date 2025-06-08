import React, { useState } from "react";
import {
  Dialog,
  Stack,
  Box,
  Typography,
  List,
  Paper,
  Divider,
  TextField,
  Chip,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import { Close as CloseIcon, Group as GroupIcon } from "@mui/icons-material";
import { sampleUsers } from "../data/sampleData";
import UserList from "../shared/UserList";

function NewGroup({ onClose }) {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleToggleUser = (userId) => {
    setLoadingUserId(userId);
    setSelectedUsers((prev) => {
      const isSelected = prev.some((u) => u._id === userId);
      if (isSelected) {
        return prev.filter((u) => u._id !== userId);
      } else {
        const userToAdd = sampleUsers.find((u) => u._id === userId);
        return [...prev, userToAdd];
      }
    });
    setLoadingUserId(null);
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedUsers.length >= 2) {
      console.log("Creating group with name:", groupName);
      console.log("Selected users:", selectedUsers);
      handleClose();
    }
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const isButtonEnabled = groupName.trim() !== "" && selectedUsers.length >= 2;

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          width: { xs: "95%", sm: "450px" },
          maxWidth: "450px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #0a2e63 0%, #1976d2 100%)",
          py: 1.5,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GroupIcon fontSize="small" />
          Create New Group
        </Typography>

        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            color: "white",
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Stack p={2} spacing={2} sx={{ maxHeight: "70vh" }}>
        <TextField
          label="Group Name"
          variant="outlined"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "rgba(0,0,0,0.02)",
            },
          }}
        />

        {selectedUsers.length > 0 && (
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontWeight: 500 }}
            >
              Selected Members ({selectedUsers.length})
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selectedUsers.map((user) => (
                <Chip
                  key={user._id}
                  avatar={
                    <Avatar src={user.avatar}>
                      {user.name[0].toUpperCase()}
                    </Avatar>
                  }
                  label={user.name}
                  onDelete={() => handleRemoveUser(user._id)}
                  sx={{
                    borderRadius: 1.5,
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                    "& .MuiChip-deleteIcon": {
                      color: "primary.main",
                      "&:hover": { color: "error.main" },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Divider sx={{ opacity: 0.6 }} />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ pl: 1, fontWeight: 500 }}
        >
          Select Members
        </Typography>

        <List
          sx={{
            maxHeight: 350,
            overflow: "auto",
            mt: 0,
            px: 1,
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "10px",
            },
          }}
        >
          {sampleUsers.map((user) => {
            const isSelected = selectedUsers.some((u) => u._id === user._id);
            const isLoading = loadingUserId === user._id;

            return (
              <Paper
                key={user._id}
                elevation={0}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "all 0.2s",
                  backgroundColor: isSelected
                    ? "rgba(25, 118, 210, 0.08)"
                    : "rgba(0,0,0,0.01)",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "rgba(25, 118, 210, 0.12)"
                      : "rgba(0,0,0,0.04)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <UserList
                  key={user._id}
                  user={user}
                  handler={handleToggleUser}
                  handlerIsLoading={isLoading}
                  isAdded={isSelected}
                />
              </Paper>
            );
          })}
        </List>

        <Button
          variant="contained"
          fullWidth
          disabled={!isButtonEnabled}
          onClick={handleCreateGroup}
          sx={{
            mt: 2,
            py: 1.2,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            opacity: isButtonEnabled ? 1 : 0.6,
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)",
              transform: isButtonEnabled ? "translateY(-2px)" : "none",
              backgroundColor: "primary.dark",
            },
            "&:disabled": {
              backgroundColor: "rgba(0,0,0,0.12)",
              color: "rgba(0,0,0,0.38)",
            },
          }}
        >
          Create Group ({selectedUsers.length} members)
        </Button>
      </Stack>
    </Dialog>
  );
}

export default NewGroup;
