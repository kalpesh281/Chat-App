import React, { useEffect, useState } from "react";
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
  Chip,
  Avatar,
  Container,
} from "@mui/material";
import {
  Search as SearchIcon,
  DeleteOutline,
  Edit,
  PersonAdd,
  Person,
  Group as GroupIcon,
} from "@mui/icons-material";
import { fetchAllUsers } from "../../redux/reducers/adminSlice";
import { DataGrid } from "@mui/x-data-grid";
import { sampleUserData } from "../../components/data/sampleData";
import { useDispatch, useSelector } from "react-redux";

function UserListPage() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.admin);
  const [searchQuery, setSearchQuery] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Map users from Redux to DataGrid rows
  useEffect(() => {
    if (Array.isArray(users)) {
      setRows(
        users.map((user, idx) => ({
          id: idx + 1,
          name: user.name || "",
          username: user.username || "",
          friends:
            user.friendsCount ??
            (Array.isArray(user.friends) ? user.friends.length : 0),
          groups:
            user.groupsCount ??
            (Array.isArray(user.groups) ? user.groups.length : 0),
          joinedAt: user.updatedAt
            ? new Date(user.updatedAt).toLocaleDateString()
            : "",
        }))
      );
    }
  }, [users]);

  console.log("Users fetched:", users);
  // Filter rows based on search query
  const filteredRows = rows.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      row.name.toLowerCase().includes(query) ||
      row.username.toLowerCase().includes(query) ||
      row.friends.toString().includes(query) ||
      row.groups.toString().includes(query) ||
      row.joinedAt.toLowerCase().includes(query)
    );
  });

  // Define columns with enhanced styling
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 70,
      flex: 0.5,
      renderCell: (params) => (
        <Typography sx={{ fontWeight: 500, color: "#616161" }}>
          #{params.value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      width: 180,
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
              fontSize: "0.875rem",
            }}
          >
            {params.value.charAt(0)}
          </Avatar>
          <Typography sx={{ fontWeight: 500 }}>{params.value}</Typography>
        </Stack>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "table-header",
      width: 160,
      flex: 1.2,
      renderCell: (params) => (
        <Typography sx={{ color: "#1976d2", fontWeight: 500 }}>
          @{params.value}
        </Typography>
      ),
    },
    {
      field: "friends",
      headerName: "Friends",
      headerClassName: "table-header",
      width: 120,
      flex: 1,
      renderCell: (params) => (
        <Chip
          icon={<Person sx={{ fontSize: "1rem !important" }} />}
          label={params.value}
          size="small"
          sx={{
            backgroundColor: "rgba(25, 118, 210, 0.1)",
            color: "#1976d2",
            fontWeight: 600,
            minWidth: "60px",
          }}
        />
      ),
    },
    {
      field: "groups",
      headerName: "Groups",
      headerClassName: "table-header",
      width: 120,
      flex: 1,
      renderCell: (params) => (
        <Chip
          icon={<GroupIcon sx={{ fontSize: "1rem !important" }} />}
          label={params.value}
          size="small"
          sx={{
            backgroundColor: "rgba(46, 125, 50, 0.1)",
            color: "#2e7d32",
            fontWeight: 600,
            minWidth: "60px",
          }}
        />
      ),
    },
    {
      field: "joinedAt",
      headerName: "Joined At",
      headerClassName: "table-header",
      width: 130,
      flex: 1.1,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            py: 0.5,
            px: 1,
            borderRadius: 1,
            fontWeight: 500,
          }}
        >
          {params.value}
        </Typography>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Container
        maxWidth="xl"
        sx={{
          py: 2, // Reduced top/bottom padding
          px: { xs: 1, sm: 2 }, // Responsive horizontal padding
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: { xs: 1.5, md: 2 }, // Reduced padding
            mb: 3, // Reduced bottom margin
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
              background: "#1976d2", // Primary blue for users
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
              <Person
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  color: "primary.main",
                }}
              />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#1976d2",
              }}
            >
              User Management
            </Typography>

            <Box flexGrow={1} />

            <TextField
              placeholder="Search users..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: { xs: "100%", sm: "300px" },
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
                    <SearchIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Paper>

        <Box
          sx={{
            height: { xs: "calc(100vh - 190px)", md: "calc(100vh - 170px)" }, // Dynamic height based on viewport
            width: "100%",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
            backgroundColor: "white",
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            disableColumnMenu
            sx={{
              border: "none",
              "& .table-header": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                color: "#1976d2",
                fontWeight: 600,
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "white",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "white",
                px: 2, // Add some padding to footer
              },
              "& .MuiDataGrid-toolbarContainer": {
                backgroundColor: "white",
                padding: 1, // Reduce padding
              },
              "& .MuiDataGrid-cell": {
                paddingLeft: 1,
                paddingRight: 1,
                fontSize: "0.875rem", // Slightly smaller font for better fit
              },
              "& .MuiDataGrid-row": {
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
                "&:nth-of-type(even)": {
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                },
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              // Better header styling
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 600,
                fontSize: "0.875rem",
              },
              // Row height slightly reduced
              "& .MuiDataGrid-viewport": {
                "& .MuiDataGrid-row": {
                  maxHeight: "52px !important",
                  minHeight: "52px !important",
                },
              },
            }}
          />
        </Box>
      </Container>
    </AdminLayout>
  );
}

export default UserListPage;
