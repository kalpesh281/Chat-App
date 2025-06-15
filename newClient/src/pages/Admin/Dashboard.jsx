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
  const Appbar = (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, md: 3 },
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
      spacing={2}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"1rem 0"}
    >
      <Widgets title={"Users"} value={1234} icon={<Person2 />} />
      <Widgets title={"Groups"} value={567} icon={<Group />} />
      <Widgets title={"Messages"} value={89} icon={<Message />} />
    </Stack>
  );

  return (
    <>
      <AdminLayout>
        <Container component={"main"}>{Appbar}</Container>
        <Stack direction={"row"} spacing={2} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: 3,
              width: "100%",
              maxWidth: "45rem",
              height: "25rem",
            }}
          >
            <Typography variant="h5">Last Messages</Typography>
            <LineChart />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem ",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <Group /> <Typography variant="h6">Vs</Typography>
              <Person2 />
            </Stack>
          </Paper>
        </Stack>
        {widgets}
      </AdminLayout>
    </>
  );
}

const Widgets = ({ title, value, icon }) => (
  <Paper
    sx={{
      padding: "1.5rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "10rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        variant="h6"
        sx={{
          color: "text.primary",
          borderRadius: "50%",
          border: "5px solid #1976d2",
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {icon}
        <Typography variant="subtitle1">{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
