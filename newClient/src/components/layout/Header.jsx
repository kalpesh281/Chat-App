import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
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
      <Box sx={{ flexShrink: 0 }} height={"4rem"}>
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Chat Application
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            <Box>
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
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
