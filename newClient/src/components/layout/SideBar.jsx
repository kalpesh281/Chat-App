import {
  Box,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Person as UserIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const adminTabs = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/users-list",
    icon: <UserIcon />,
  },
  {
    name: "Chats",
    path: "/groups-list",
    icon: <GroupIcon />,
  },
  { name: "Messages", path: "/messages-list", icon: <MessageIcon /> },
];

function SideBar({ w = "100%" }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Logout failed");
    }
  };

  return (
    <Stack
      width={w}
      direction={"column"}
      p={{ xs: 2, sm: 3 }}
      sx={{ height: "100%", justifyContent: "space-between" }}
    >
      <Stack spacing={3}>
        <Typography
          variant="h5"
          fontWeight={600}
          textTransform={"capitalize"}
          mb={1}
        >
          Admin
        </Typography>
        <Stack spacing={3}>
          {adminTabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <MuiLink
                key={tab.path}
                component={RouterLink}
                to={tab.path}
                underline="none"
                sx={{
                  borderRadius: "8px",
                  transition: "all 0.2s ease-in-out",
                  mb: 0.5,
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={"1rem"}
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderRadius: "8px",
                    bgcolor: isActive
                      ? "rgba(25, 118, 210, 0.08)"
                      : "transparent",
                    borderLeft: isActive
                      ? "4px solid"
                      : "4px solid transparent",
                    borderColor: isActive ? "primary.main" : "transparent",
                  }}
                >
                  <Box
                    sx={{
                      color: isActive ? "primary.main" : "text.secondary",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {tab.icon}
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight={isActive ? 500 : 400}
                    color={isActive ? "primary.main" : "text.primary"}
                  >
                    {tab.name}
                  </Typography>
                </Stack>
              </MuiLink>
            );
          })}
        </Stack>
      </Stack>

      {/* Logout section */}
      <Stack spacing={0}>
        <Divider sx={{ my: 2 }} />
        <MuiLink
          component="button"
          underline="none"
          onClick={handleLogout}
          sx={{
            borderRadius: "8px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              bgcolor: "rgba(211, 47, 47, 0.04)",
            },
            textAlign: "left",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                color: "error.main",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LogoutIcon />
            </Box>
            <Typography variant="body1" fontWeight={500} color="error.main">
              Logout
            </Typography>
          </Stack>
        </MuiLink>
      </Stack>
    </Stack>
  );
}

export default SideBar;
