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
  Container,
  Avatar,
} from "@mui/material";
import {
  Search,
  Users as LucideGroup,
  MessageCircle,
} from "lucide-react"; // lucide-react icons
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGroups } from "../../redux/reducers/adminSlice";

function ChatManagement() {
  const dispatch = useDispatch();

  const { groups, error, loading } = useSelector((state) => state.admin || {});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllGroups());
  }, [dispatch]);

  // Map backend groups to DataGrid rows
  const groupRows = Array.isArray(groups)
    ? groups.map((group, idx) => ({
        id: idx + 1,
        name: group.groupName || "",
        creator:
          typeof group.creator === "object"
            ? group.creator.username || group.creator.name || ""
            : group.creator || "",
        members: group.members ?? 0,
        messages: group.messages ?? 0,
        createdAt: group.createdAt
          ? new Date(group.createdAt).toLocaleDateString()
          : "",
        lastActive: group.updatedAt
          ? new Date(group.updatedAt).toLocaleDateString()
          : "",
      }))
    : [];


  const filteredData = groupRows.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );


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
      headerName: "Group Name",
      headerClassName: "table-header",
      width: 200,
      flex: 1.8,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#2e7d32",
              fontSize: "0.875rem",
            }}
          >
            <LucideGroup size={16} />
          </Avatar>
          <Typography sx={{ fontWeight: 500 }}>{params.value}</Typography>
        </Stack>
      ),
    },
    {
      field: "creator",
      headerName: "Creator",
      headerClassName: "table-header",
      width: 150,
      flex: 1.2,
      renderCell: (params) => (
        <Typography sx={{ color: "#1976d2", fontWeight: 500 }}>
          @{params.value}
        </Typography>
      ),
    },
    {
      field: "members",
      headerName: "Members",
      headerClassName: "table-header",
      width: 120,
      flex: 1,
      renderCell: (params) => (
        <Chip
          icon={<LucideGroup size={16} style={{ marginLeft: 4 }} />}
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
      field: "messages",
      headerName: "Messages",
      headerClassName: "table-header",
      width: 120,
      flex: 1,
      renderCell: (params) => (
        <Chip
          icon={<MessageCircle size={16} style={{ marginLeft: 4 }} />}
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
      field: "createdAt",
      headerName: "Created At",
      headerClassName: "table-header",
      width: 120,
      flex: 1,
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
    {
      field: "lastActive",
      headerName: "Last Active",
      headerClassName: "table-header",
      width: 120,
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            py: 0.5,
            px: 1,
            borderRadius: 1,
            fontWeight: 500,
            backgroundColor: "rgba(255, 152, 0, 0.1)",
            color: "#ed6c02",
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
              background: "#2e7d32", // Using green for chat management
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
                color: "#2e7d32",
                mr: 1,
              }}
            >
              <LucideGroup
                size={32}
                style={{ color: "#2e7d32" }}
              />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#2e7d32",
              }}
            >
              Group Chat Management
            </Typography>

            <Box flexGrow={1} />

            <TextField
              placeholder="Search groups..."
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
                    borderColor: "#4caf50",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search
                      size={18}
                      style={{ color: "#757575" }}
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
            rows={filteredData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            disableColumnMenu
            sx={{
              border: "none",
              "& .table-header": {
                backgroundColor: "rgba(46, 125, 50, 0.08)",
                color: "#1b5e20",
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



export default ChatManagement;
