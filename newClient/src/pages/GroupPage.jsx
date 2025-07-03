import {
  Backdrop,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Paper,
  Avatar,
  Divider,
  alpha,
} from "@mui/material";
import React, { memo, useState } from "react";
import {
  ArrowLeft,
  Pencil,
  Check,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react"; // lucide-react icons
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponent";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../components/data/sampleData";
import { useEffect } from "react";
import { Suspense } from "react";
import ConfirmDeleteDialog from "../components/dialog/ConfirmDeleteDialog";
import AddMemberDialog from "../components/dialog/AddMemberDialog";
import UserList from "../components/shared/UserList";
import {
  useChatDetailsQuery,
  useMyGroupsQuery,
  useRenameGroupMutation,
} from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/hooks";
import Loader from "../components/layout/Loader";
import toast from "react-hot-toast";

const isAddMember = false;
const GroupIcon = Users;

function GroupPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [member, setMember] = useState([]);
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const chatId = useSearchParams()[0].get("group");

  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery(
    {
      chatId,
      populate: true, // <-- use boolean true, not string "true"
    },
    {
      skip: !chatId,
    }
  );

  const [isLoadingGroupName, , updateGroup] = useAsyncMutation(
    useRenameGroupMutation
  );

  // console.log("My Groups:", myGroups.data);
  // console.log("Group Details:", groupDetails.data);

  const handleBackClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.groupName);
      setGroupNameUpdatedValue(groupDetails.data.chat.groupName);
      setMember(groupDetails.data.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMember([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const updateGroupName = () => {
    setIsEdit(false);
    if (groupNameUpdatedValue.trim() === "") {
      toast.error("Group name cannot be empty");
      return;
    }
    if (groupNameUpdatedValue === groupName) {
      toast.error("Group name is unchanged");
      return;
    }
    updateGroup("Updating Group Name...", {
      chatId,
      groupName: groupNameUpdatedValue.trim(),
    });
  };

  const openConfirmDeleteGroup = () => {
    setConfirmDeleteDialog(true);
    console.log("Open confirm delete group dialog");
  };

  const closeConfirmDeleteGroup = () => {
    setConfirmDeleteDialog(false);
    console.log("Close confirm delete group dialog");
  };

  const handleAddGroup = () => {
    console.log("Add member to group");
  };

  const removeMemberHandler = (id) => {
    console.log("Remove member with ID:", id);
  };

  const deleteHandle = () => {
    console.log("Group deleted");
    closeConfirmDeleteGroup();
  };

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
  ];

  useErrors(errors);

  const My_groups = myGroups.data?.chats || []; // handle undefined safely

  const IconsBtns = (
    <Tooltip title="Back" arrow placement="right">
      <IconButton
        sx={{
          color: "black",

          "&:hover": {
            backgroundColor: "#115293",
            transform: "translateX(-3px)",
            color: "#ffffff",
          },

          transition: "all 0.3s ease",
        }}
        onClick={handleBackClick}
      >
        <ArrowLeft size={24} />
      </IconButton>
    </Tooltip>
  );

  const GroupNameSection = (
    <Paper
      elevation={1}
      sx={{
        p: 4,
        width: "100%",
        borderRadius: 3,
        background: `linear-gradient(145deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9))`,
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
        mb: 1,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "6px",
          height: "100%",
          background: "#1976d2",
          borderTopLeftRadius: 3,
          borderBottomLeftRadius: 3,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        {isEdit ? (
          <>
            <TextField
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4791db",
                  },
                },
              }}
              autoFocus
            />
            <IconButton
              onClick={updateGroupName}
              disabled={isLoadingGroupName}
              sx={{
                ml: 2,
                color: "#1976d2",
                backgroundColor: "rgba(71, 145, 219, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(71, 145, 219, 0.2)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <Check size={22} />
            </IconButton>
          </>
        ) : (
          <>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "#1976d2",
                  width: 48,
                  height: 48,
                  boxShadow: `0 4px 12px rgba(25, 118, 210, 0.3)`,
                }}
              >
                <Users size={28} />
              </Avatar>
              <Stack>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#212121",
                  }}
                >
                  {groupName}
                </Typography>
              </Stack>
            </Stack>
            <Tooltip title="Edit group name" arrow>
              <IconButton
                onClick={() => setIsEdit(true)}
                sx={{
                  color: "#757575",
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.1)",
                    color: "#1976d2",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Pencil size={22} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
    </Paper>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "1rem",
        sm: "1.5rem",
        md: "1.5rem 4rem",
      }}
      sx={{
        width: "100%",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<Trash2 size={20} />}
        variant="outlined"
        onClick={openConfirmDeleteGroup}
        sx={{
          borderRadius: 2,
          py: 1.2,
          px: 3,
          borderWidth: "1.5px",
          textTransform: "none",
          fontWeight: 500,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            borderWidth: "1.5px",
            backgroundColor: "rgba(211, 47, 47, 0.04)", // alpha(error.main, 0.04)
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        color="primary"
        startIcon={<UserPlus size={20} />}
        onClick={handleAddGroup}
        sx={{
          borderRadius: 2,
          py: 1.2,
          px: 3,
          textTransform: "none",
          fontWeight: 500,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          background: `linear-gradient(90deg, #1976d2, #115293)`,
          "&:hover": {
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <Loader />
  ) : (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        bgcolor: "rgba(245, 245, 245, 0.5)", // alpha(background.default, 0.5)
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          width: "20%",
          height: "100%",
          overflow: "auto",
          borderRight: `1px solid rgba(224, 224, 224, 0.7)`,
          bgcolor: "#ffffff",
          boxShadow: "inset -5px 0 15px rgba(0, 0, 0, 0.03)",
          p: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="600"
          sx={{
            px: 1.5,
            py: 1,
            color: "#757575",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GroupIcon size={18} />
          My Groups
        </Typography>
        <Divider sx={{ mb: 2, opacity: 0.6 }} />
        <GroupList myGroups={My_groups} chatId={chatId} />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: "80%" },
          height: "100%",
          padding: 0,
          bgcolor: "rgba(245, 245, 245, 0.5)", // alpha(background.default, 0.5)
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(200, 200, 255, 0.05) 0%, transparent 50%)",
            backgroundSize: "100% 100%",
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            boxSizing: "border-box",
            display: "flex",
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "auto",
            zIndex: 1,
          }}
        >
          {groupDetails.data &&
            groupDetails.data.chat &&
            groupDetails.data.chat.groupName && (
              <>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ width: "100%", mb: 4 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {IconsBtns}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>{GroupNameSection}</Box>
                </Stack>

                {/* Members section */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    width: "100%",
                    borderRadius: 3,
                    bgcolor: "#ffffff",
                    mb: 3,
                    position: "relative",
                    maxHeight: "400px", // Fixed height to enable scrolling
                    overflow: "hidden", // Hide overflow
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#212121",
                      mb: 2,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    Members
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Box
                    sx={{
                      overflowY: "auto",
                      flex: 1,
                      pr: 1, // Add a bit of padding to account for scrollbar
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,0.1)",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    {groupDetails.data.chat.members.map((i) => (
                      <UserList
                        user={i}
                        key={i._id}
                        handler={removeMemberHandler}
                        isAdded
                        styling={{
                          cursor: "pointer",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                          padding: "8px 16px",
                          borderRadius: 2,
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          mb: 3,
                          borderLeft: "3px solid rgba(62, 105, 184, 0.5)", // Green border indicating member
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Paper>

                {ButtonGroup}
              </>
            )}
        </Box>

        {isAddMember && (
          <Suspense fallback={<Backdrop open={true} />}>
            <AddMemberDialog />
          </Suspense>
        )}

        {confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open={true} />}>
            <ConfirmDeleteDialog
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteGroup}
              deleteHandle={deleteHandle}
            />
          </Suspense>
        )}
      </Box>
    </Box>
  );
}

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack spacing={0.5}>
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem
            key={group._id}
            group={group}
            chatId={chatId}
            sx={{ width: w }}
          />
        ))
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 1.5, // Reduced padding
            borderRadius: 2,
            bgcolor: "rgba(255, 255, 255, 0.5)",
            border: `1px dashed rgba(158, 158, 158, 0.3)`, // alpha(text.disabled, 0.3)
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            color="#757575" // textSecondary
            align="center"
            sx={{ fontStyle: "italic" }}
          >
            No groups found.
          </Typography>
        </Paper>
      )}
    </Stack>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { _id, groupName } = group;
  const isSelected = chatId === _id;

  // Generate color and first letter for group avatar (like ChatItem)
  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 55%)`;
  }
  const firstLetter = groupName ? groupName.charAt(0).toUpperCase() : "";
  const avatarColor = stringToColor(groupName || "");

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
      style={{ textDecoration: "none" }}
    >
      <Paper
        elevation={isSelected ? 2 : 0}
        sx={{
          p: 1.2,
          borderRadius: 2,
          background: isSelected
            ? "linear-gradient(90deg, #e3f0ff 0%, #eaf6ff 100%)"
            : "transparent",
          borderLeft: isSelected
            ? "4px solid #1976d2"
            : "4px solid transparent",
          boxShadow: isSelected
            ? "0 4px 16px 0 rgba(25, 118, 210, 0.10)"
            : "none",
          transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
          cursor: "pointer",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ width: "100%" }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              backgroundColor: avatarColor,
              color: "white",
              fontWeight: 700,
              fontSize: "1.1rem",
              userSelect: "none",
              boxShadow: "0 1px 4px rgba(25, 118, 210, 0.08)",
              mr: 1,
            }}
          >
            {firstLetter}
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: isSelected ? 700 : 500,
              fontSize: "1rem",
              color: isSelected ? "#1976d2" : "#212121",
              flexGrow: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              letterSpacing: 0.1,
            }}
          >
            {groupName}
          </Typography>
          {isSelected && (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#1976d2",
                boxShadow: `0 0 0 2px rgba(25, 118, 210, 0.2)`,
              }}
            />
          )}
        </Stack>
      </Paper>
    </Link>
  );
});

export default GroupPage;
