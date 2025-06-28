import { Avatar, Stack, Typography, Box, Paper, Divider } from "@mui/material";
import {
  Person as PersonIcon,
  AlternateEmail as UsernameIcon,
  Info as BioIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/reducers/authSlice";

function Profile() {
  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state.auth);

  // console.log("User Profile:", userProfile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  const joinDate = userProfile?.createdAt
    ? moment(userProfile.createdAt).format("MMMM Do, YYYY")
    : "";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "white",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Profile header with avatar */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1976d2, #1565c0)",
          pt: 5,
          pb: 7,
          position: "relative",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="white" fontWeight={500} sx={{ mb: 1 }}>
          My Profile
        </Typography>

        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                objectFit: "cover",
                border: "4px solid white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                backgroundColor: "#1976d2",
                fontSize: "2.5rem",
              }}
            >
              {userProfile?.name?.charAt(0)?.toUpperCase() || "?"}
            </Avatar>
          </Box>
        </Box>
      </Box>

      {/* Profile content */}
      <Stack
        spacing={2}
        sx={{
          p: 3,
          mt: 6,
          bgcolor: "#ffffff",
        }}
      >
        <ProfileCard
          heading="Name"
          text={userProfile?.name}
          Icon={<PersonIcon color="primary" />}
        />
        <Divider sx={{ opacity: 0.6 }} />

        <ProfileCard
          heading="Username"
          text={userProfile?.username}
          Icon={<UsernameIcon color="primary" />}
        />
        <Divider sx={{ opacity: 0.6 }} />

        <ProfileCard
          heading="Joined"
          text={joinDate}
          Icon={<CalendarIcon color="primary" />}
        />
        <Divider sx={{ opacity: 0.6 }} />

        <ProfileCard
          heading="Bio"
          text={userProfile?.bio}
          Icon={<BioIcon color="primary" />}
          multiline
        />
      </Stack>
    </Paper>
  );
}

const ProfileCard = ({ text, Icon, heading, multiline = false }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems={multiline ? "flex-start" : "center"}
      sx={{
        py: 1,
      }}
    >
      <Box
        sx={{
          borderRadius: 1,
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(25, 118, 210, 0.05)",
          flexShrink: 0,
        }}
      >
        {Icon}
      </Box>

      <Stack spacing={0.5}>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            fontWeight: 500,
            lineHeight: multiline ? 1.5 : "normal",
          }}
        >
          {text}
        </Typography>
        <Typography
          color="text.secondary"
          variant="caption"
          sx={{ fontWeight: 500 }}
        >
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
