import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  Divider,
  Badge,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import {
  Plus as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Users as GroupIcon,
  LogOut as LogoutIcon,
  Bell as NotificationsIcon,
  MessageCircle as ChatIcon,
} from "lucide-react"; // lucide-react icons
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducers/authSlice";
import toast from "react-hot-toast";

import {
  setIsNotification,
  setIsSearch,
  setIsNewGroup,
} from "../../redux/reducers/miscSlice";
import { resetNotificationCount } from "../../redux/reducers/chatSlice";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notification"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

function Header() {
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { notificationCount } = useSelector((state) => state.chat);
  const {
    isSearch,
    isNotification,
    isNewGroup: isNewGroupFromStore,
  } = useSelector((state) => state.misc);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
    console.log("Mobile view detected");
  };

  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
    console.log("Open search dialog");
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const navigateToGroup = () => navigate("/groups");

  const openNotifications = () => {
    dispatch(setIsNotification(true));

    dispatch(resetNotificationCount());
  };
  const logoutHandler = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Logout failed");
    }
  };
  return (
    <>
      <Box sx={{ flexShrink: 0 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: "linear-gradient(135deg, #0a2e63 0%, #1976d2 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Toolbar sx={{ minHeight: "64px", px: { xs: 1.5, sm: 3 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ChatIcon
                style={{
                  fontSize: 28,
                  color: "#fff",
                  filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))",
                  width: 28,
                  height: 28,
                }}
              />
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: 24,
                  mx: 0.5,
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  background: "linear-gradient(90deg, #ffffff, #e0e0e0)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.3))",
                }}
              >
                Message Me!
              </Typography>
            </Box>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
                ml: 1,
              }}
            >
              <IconButton
                color="inherit"
                onClick={handleMobile}
                sx={{
                  background: "rgba(255,255,255,0.1)",
                  "&:hover": { background: "rgba(255,255,255,0.2)" },
                }}
              >
                <MenuIcon size={22} />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box
              sx={{
                display: "flex",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "28px",
                py: 0.5,
                px: 1,
                mr: { xs: 0, sm: 1 },
              }}
            >
              <IconBtn
                title={"Search"}
                icon={<SearchIcon size={20} />}
                onClick={openSearchDialog}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon size={20} />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon size={20} />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon size={20} />}
                onClick={openNotifications}
                value={notificationCount}
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon size={20} />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
          <Box
            sx={{
              height: "4px",
              background: "linear-gradient(90deg, #64b5f6, #1565c0, #0a2e63)",
              opacity: 0.8,
            }}
          />
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open={true} />}>
          <SearchDialog onClose={() => dispatch(setIsSearch(false))} />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NotificationsDialog
            onClose={() => dispatch(setIsNotification(false))}
          />
        </Suspense>
      )}
      {isNewGroupFromStore && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NewGroupDialog onClose={() => dispatch(setIsNewGroup(false))} />
        </Suspense>
      )}
    </>
  );
}

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title} arrow placement="bottom">
      <IconButton
        color="inherit"
        size="medium"
        onClick={onClick}
        sx={{
          borderRadius: "50%",
          mx: 0.5,
          transition: "all 0.2s",
          "&:hover": {
            background: "rgba(255,255,255,0.1)",
            transform: "translateY(-2px)",
          },
        }}
      >
        {value ? (
          <Badge
            color="error"
            overlap="circular"
            sx={{
              position: "relative",
              "& .MuiBadge-badge": {
                background: "none",
                padding: 0,
                minWidth: 0,
              },
            }}
            badgeContent={
              <Box
                sx={{
                  position: "absolute",
                  top: "40%",
                  right: 0,
                  transform: "translate(50%, -50%)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#fff",
                  backgroundColor: "#d32f2f",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // Optionally add a boxShadow for better visibility
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              >
                {value}
              </Box>
            }
          >
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
