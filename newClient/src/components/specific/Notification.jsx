import React, { memo } from "react";
import {
  Dialog,
  Stack,
  Box,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  IconButton,
  List,
  Paper,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationQuery,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/miscSlice";
import toast from "react-hot-toast";

function Notification() {
  const dispatch = useDispatch();
  const isNotification = useSelector((state) => state.misc.isNotification);
  const { isLoading, error, data, isError } = useGetNotificationQuery("");

  const [acceptRequest] = useAcceptFriendRequestMutation();

  useErrors([{ isError, error }]);

  const friendHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res?.data?.success) {
        console.log("Use Here Socket ");
        toast.success(res.data.message);
      }
      toast.error(
        res?.error?.data?.message ||
          res?.error?.message ||
          "Failed to update request"
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.message || "Failed to update request"
      );
    }
  };

  const handleClose = () => dispatch(setIsNotification(false));

  return (
    <Dialog
      open={isNotification}
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
          <NotificationsIcon fontSize="small" />
          Notifications
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

      <Stack p={2} spacing={2} sx={{ maxHeight: "400px" }}>
        {isLoading ? (
          <Box
            sx={{
              py: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            <NotificationsIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
            <Typography>Loading notifications...</Typography>
          </Box>
        ) : data?.requests?.length > 0 ? (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ pl: 1, fontWeight: 500 }}
            >
              {data.requests.length} notifications
            </Typography>

            <Divider sx={{ opacity: 0.6 }} />

            <List
              sx={{
                maxHeight: 350,
                overflow: "auto",
                mt: 1,
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
              {data.requests.map(({ sender, _id }) => (
                <Paper
                  key={_id}
                  elevation={0}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "all 0.2s",
                    backgroundColor: "rgba(0,0,0,0.01)",
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.08)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  <NotificationItem
                    sender={sender}
                    _id={_id}
                    handler={friendHandler}
                  />
                </Paper>
              ))}
            </List>
          </>
        ) : (
          <Box
            sx={{
              py: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            <NotificationsIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
            <Typography>No notifications available</Typography>
          </Box>
        )}
      </Stack>
    </Dialog>
  );
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem
      alignItems="center"
      sx={{
        p: 2,
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box display="flex" width="100%" alignItems="center">
        <ListItemAvatar>
          <Avatar
            src={avatar}
            alt={name}
            sx={{
              width: 45,
              height: 45,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              border: "2px solid white",
              backgroundColor: "primary.main",
            }}
          >
            {name ? name[0].toUpperCase() : "U"}
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ lineHeight: 1.2 }}
            >
              {name}
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="text.secondary">
              sent you a friend request
            </Typography>
          }
        />
      </Box>

      <Stack direction="row" spacing={1} mt={1.5} ml={7}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{
            minWidth: "80px",
            fontWeight: 500,
            textTransform: "none",
            borderRadius: 1.5,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            "&:hover": {
              boxShadow: "0 4px 8px rgba(25, 118, 210, 0.3)",
              transform: "translateY(-1px)",
            },
          }}
          onClick={() => handler({ _id, accept: true })}
        >
          Accept
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          sx={{
            minWidth: "80px",
            fontWeight: 500,
            textTransform: "none",
            borderRadius: 1.5,
            "&:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.04)",
              borderColor: "error.main",
            },
          }}
          onClick={() => handler({ _id, accept: false })}
        >
          Reject
        </Button>
      </Stack>
    </ListItem>
  );
});

export default Notification;
