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
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notification"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);

  const navigate = useNavigate();
  const handleMobile = () => {
    setIsMobile((prev) => !prev);
    console.log("Mobile view detected");
  };

  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
    console.log("Open search dialog");
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
    console.log("Open new group dialog");
  };

  const navigateToGroup = () => navigate("/groups");

  const openNotifications = () => {
    setIsNotifications((prev) => !prev);
    console.log("Open notifications dialog");
  };
  const logoutHandler = () => {
    console.log("Logout handler called");
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
                sx={{
                  fontSize: 28,
                  color: "#fff",
                  filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))",
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
                Chat Application
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
                <MenuIcon />
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
                icon={<SearchIcon />}
                onClick={openSearchDialog}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotifications}
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
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
          <SearchDialog />
        </Suspense>
      )}
      {isNotifications && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NotificationsDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
}

const IconBtn = ({ title, icon, onClick }) => {
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
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
