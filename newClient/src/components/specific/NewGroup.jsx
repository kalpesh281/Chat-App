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
  IconButton,
  Button,
  Skeleton,
} from "@mui/material";
import { X as CloseIcon, Users as GroupIcon } from "lucide-react";

import UserList from "../shared/UserList";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks";
import { setIsNewGroup } from "../../redux/reducers/miscSlice";

function NewGroup({ onClose }) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);

  const { isError, isLoading, error, data } = useAvailableFriendsQuery("");
  const { isNewGroup } = useSelector((state) => state.misc);

  const [newGroup, { isLoading: isNewGroupLoading }] = useNewGroupMutation();

  console.log("Available friends data:", data);
  const handleClose = () => {
    dispatch(setIsNewGroup(false));
  };

  const handleToggleUser = (userId) => {
    setLoadingUserId(userId);
    setSelectedUsers((prev) => {
      const isSelected = prev.some((u) => u && u._id === userId);
      if (isSelected) {
        return prev.filter((u) => u && u._id !== userId);
      } else {
        const userToAdd = data.friends.find((u) => u._id === userId);
        if (userToAdd) {
          return [...prev, userToAdd];
        }
        return prev;
      }
    });
    setLoadingUserId(null);
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedUsers.length >= 2) {
      console.log("Creating group with name:", groupName);
      console.log("Selected users:", selectedUsers);
      newGroup({
        groupName,
        members: selectedUsers.map((user) => user._id),
      });

      handleClose();
    }
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const isButtonEnabled = groupName.trim() !== "" && selectedUsers.length >= 2;

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  return (
    <Dialog
      open={isNewGroup}
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
          <GroupIcon size={18} />
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
          <CloseIcon size={18} />
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
              {selectedUsers
                .filter((user) => user && user._id) // Only map valid users
                .map((user) => (
                  <Chip
                    key={user._id}
                    label={user?.name || "Unknown"}
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
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : Array.isArray(data?.friends) && data.friends.length > 0 ? (
            data.friends
              .filter((user) => user && user._id)
              .map((user) => {
                const isSelected = selectedUsers.some(
                  (u) => u && u._id === user._id
                );
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
              })
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              No friends found.
            </Typography>
          )}
        </List>

        <Button
          variant="contained"
          fullWidth
          disabled={isNewGroupLoading}
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
