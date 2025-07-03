import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Box,
  Divider,
  IconButton,
  alpha,
  Slide,
  Avatar,
  TextField,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import { sampleUsers } from "../data/sampleData";
import UserList from "../shared/UserList";
import {
  X as CloseIcon,
  Search as SearchIcon,
  UserPlus as PersonAddIcon,
  Users as GroupAddIcon,
} from "lucide-react"; // lucide-react icons
import {
  useAddGroupMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/miscSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddMemberDialog({ chatId }) {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Add group member mutation
  const [isLoadingAddMember, , addMember] = useAsyncMutation(
    useAddGroupMemberMutation
  );

  const { isError, isLoading, error, data } = useAvailableFriendsQuery("");
  console.log("Available friends data:", data);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter((memberId) => memberId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const addFriendSubmitHandler = () => {
    if (selectedMembers.length === 0) {
      console.warn("No members selected to add");
      return;
    }
    addMember("Adding members to group...", {
      chatId,
      members: selectedMembers,
    });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
    console.log("Closing Add Member Dialog");
  };

  const filteredMembers = data.friends.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog
      open={isAddMember}
      onClose={closeHandler}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: 500,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          position: "relative",
          overflow: "visible",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#1976d2", // primary.main
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#1976d2", // primary.main
            width: 56,
            height: 56,
            boxShadow: `0 4px 14px rgba(25, 118, 210, 0.3)`, // alpha(primary.main, 0.3)
          }}
        >
          <GroupAddIcon size={28} />
        </Avatar>
      </Box>

      <DialogTitle
        sx={{
          mt: 3.5,
          textAlign: "center",
          pb: 1,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          color="#212121" // text.primary
        >
          Add Members to Group
        </Typography>
        <IconButton
          aria-label="close"
          onClick={closeHandler}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#9e9e9e", // grey[500]
          }}
        >
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: 2, opacity: 0.6 }} />

      <DialogContent sx={{ pt: 2, px: 2 }}>
        <TextField
          fullWidth
          placeholder="Search members..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4791db", // primary.light
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="#757575" size={18} />
              </InputAdornment>
            ),
          }}
        />

        {selectedMembers.length > 0 && (
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              bgcolor: "rgba(71, 145, 219, 0.08)", // alpha(primary.light, 0.08)
              borderRadius: 2,
              border: `1px dashed rgba(25, 118, 210, 0.3)`, // alpha(primary.main, 0.3)
            }}
          >
            <Typography
              variant="body2"
              color="#757575" // text.secondary
              fontWeight={500}
              sx={{ mb: 1 }}
            >
              Selected: {selectedMembers.length} member(s)
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {selectedMembers.map((id) => {
                const user = members.find((m) => m._id === id);
                return user ? (
                  <Box
                    key={id}
                    sx={{
                      bgcolor: "rgba(25, 118, 210, 0.1)", // alpha(primary.main, 0.1)
                      color: "#1976d2", // primary.main
                      borderRadius: 10,
                      px: 1,
                      py: 0.5,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    {user.name}
                  </Box>
                ) : null;
              })}
            </Stack>
          </Box>
        )}

        <Box
          sx={{
            maxHeight: 300,
            overflowY: "auto",
            borderRadius: 1,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(25, 118, 210, 0.2)", // alpha(primary.main, 0.2)
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(255, 255, 255, 0.5)", // alpha(background.paper, 0.5)
            },
          }}
        >
          <Stack spacing={1}>
            {isLoading ? (
              <Skeleton variant="rectangular" height={48} width="100%" />
            ) : filteredMembers.length > 0 ? (
              filteredMembers.map((user) => (
                <UserList
                  key={user._id}
                  user={user}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              ))
            ) : (
              <Box
                sx={{
                  p: 3,
                  textAlign: "center",
                  color: "#757575", // text.secondary
                }}
              >
                <Typography variant="body2">No users found</Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2.5, justifyContent: "space-between" }}>
        <Button
          color="inherit"
          onClick={closeHandler}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 0.8,
            textTransform: "none",
            fontWeight: 500,
            color: "black",
            "&:hover": {
              backgroundColor: "gray",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={isLoadingAddMember}
          onClick={addFriendSubmitHandler}
          startIcon={<PersonAddIcon size={18} />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 0.8,
            textTransform: "none",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            background: `linear-gradient(90deg, #1976d2, #115293)`, // primary.main to primary.dark
            "&:hover": {
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.3s ease",
            opacity: selectedMembers.length === 0 ? 0.7 : 1,
          }}
        >
          Add {selectedMembers.length > 0 ? `(${selectedMembers.length})` : ""}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMemberDialog;
