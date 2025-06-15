import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";

import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useTheme,
  Container,
  alpha,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group,
  Message,
  Person2,
  Search as SearchIcon,
} from "@mui/icons-material";
import moment from "moment";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";

function Dashboard() {
  // Define user and group counts for consistent usage
  const userCount = 1234;
  const groupCount = 567;
  const messageCount = 89;

  // Define chart data
  const chatDistributionLabels = ["Single Chat", "Group Chats"];
  const chatDistributionValues = [20, 80];

  const Appbar = (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, md: 2 },
        mb: 4,
        borderRadius: 3,
        background: `linear-gradient(145deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9))`,
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
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
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#1976d2",
            mr: 1,
          }}
        >
          <AdminPanelSettingsIcon
            sx={{
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              color: "primary.main",
            }}
          />
        </Box>

        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          sx={{
            flexGrow: { xs: 1, md: 0.3 },
            width: { xs: "100%", sm: "auto" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4791db",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          size="medium"
          sx={{
            borderRadius: 2,
            py: 1,
            px: 2,
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
          Search
        </Button>

        <Box flexGrow={1} />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            bgcolor: "rgba(25, 118, 210, 0.08)",
            p: 1,
            px: 2,
            borderRadius: 2,
            display: "inline-flex",
            alignItems: "center",
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          }}
        >
          {moment().format("MMMM Do YYYY")}
        </Typography>
      </Stack>
    </Paper>
  );

  const widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, md: 4 }}
      justifyContent="center"
      alignItems="center"
      sx={{
        my: 4,
        width: "100%",
      }}
    >
      <Widgets
        title={"Users"}
        value={userCount}
        icon={<Person2 />}
        color="#1976d2"
        iconBgColor="rgba(25, 118, 210, 0.1)"
      />
      <Widgets
        title={"Groups"}
        value={groupCount}
        icon={<Group />}
        color="#2e7d32"
        iconBgColor="rgba(46, 125, 50, 0.1)"
      />
      <Widgets
        title={"Messages"}
        value={messageCount}
        icon={<Message />}
        color="#ed6c02"
        iconBgColor="rgba(237, 108, 2, 0.1)"
      />
    </Stack>
  );

  return (
    <>
      <AdminLayout>
        <Container component={"main"} maxWidth="xl">
          {Appbar}
        </Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          flexWrap={{ xs: "wrap", md: "nowrap" }} 
          justifyContent="space-between"
          mb={2}
        >
          <Paper
            elevation={3}
            sx={{
              padding: { xs: "1.5rem", md: "2rem" },
              borderRadius: 3,
              width: "100%", 
              maxWidth: { xs: "100%", md: "60%" }, 
              height: { xs: "20rem", md: "24rem" },
              background: "white",
              position: "relative",
              overflow: "hidden",
              flexGrow: 3, 
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
            <Typography variant="h5" fontWeight={600} color="#212121">
              Last Messages
            </Typography>
            <LineChart
              value={[65, 59, 80, 81, 56, 55, 40, 60, 70, 90, 100, 120]}
            />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: "1.5rem", md: "2rem" },
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%", // Take full width of the container
              maxWidth: { xs: "100%", md: "40%" }, // Percentage-based max width
              height: { xs: "20rem", md: "24rem" },
              position: "relative",
              background: "white",
              flexGrow: 2, // Takes less space in the row
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "6px",
                height: "100%",
                background: "#2e7d32", // Using success green color
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3,
              },
            }}
          >
            <Typography
              variant="h5"
              alignSelf="flex-start"
              mb={2}
              fontWeight={600}
              color="#212121"
            >
              Chat Distribution
            </Typography>
            <Box sx={{ width: "100%", height: "80%", position: "relative" }}>
              <DoughnutChart
                labels={chatDistributionLabels}
                values={chatDistributionValues}
              />
            </Box>
          </Paper>
        </Stack>
        {widgets}
      </AdminLayout>
    </>
  );
}

const Widgets = ({
  title,
  value,
  icon,
  color = "#1976d2",
  iconBgColor = "rgba(25, 118, 210, 0.1)",
}) => (
  <Paper
    elevation={2}
    sx={{
      padding: "1rem",
      borderRadius: "1.25rem",
      minWidth: { xs: "90%", sm: "10rem" },
      maxWidth: { xs: "90%", sm: "14rem" },
      flex: 1,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      },
      background: `linear-gradient(145deg, #ffffff, #f5f5f5)`,
    }}
  >
    <Stack
      alignItems="center"
      spacing={2}
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: color,
          borderRadius: "50%",
          border: `4px solid ${color}`,
          width: { xs: "5rem", sm: "6rem" },
          height: { xs: "5rem", sm: "6rem" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 0 10px ${color}40`,
          background: "white",
          m: 1,
        }}
      >
        {value}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            bgcolor: iconBgColor,
            borderRadius: "12px",
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {React.cloneElement(icon, {
            sx: { fontSize: "1.5rem", color: color },
          })}
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          {title}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

export default Dashboard;
