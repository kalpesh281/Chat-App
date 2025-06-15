import React, { useState } from "react";
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
  Search as SearchIcon,
  DeleteOutline,
  Edit,
  Message,
  Group,
  Add as AddIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { sampleGroupData } from "../../components/data/sampleData";

function ChatManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on search query
  const filteredData = sampleGroupData.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define columns for group chat data with enhanced styling
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
            <Group sx={{ fontSize: "1rem" }} />
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
          icon={<Group sx={{ fontSize: "1rem !important" }} />}
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
          icon={<Message sx={{ fontSize: "1rem !important" }} />}
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
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "table-header",
      width: 120,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            color="primary"
            sx={{
              backgroundColor: "rgba(25, 118, 210, 0.08)",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.12)",
              },
            }}
            onClick={() => handleEdit(params.row.id)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            sx={{
              backgroundColor: "rgba(211, 47, 47, 0.08)",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.12)",
              },
            }}
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const handleEdit = (id) => {
    console.log(`Editing group with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting group with id: ${id}`);
  };

  return (
    <AdminLayout>
      <Container maxWidth="xl">
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
              <Group
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  color: "success.main",
                }}
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
                    <SearchIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              size="medium"
              sx={{
                borderRadius: 2,
                py: 1,
                px: 2,
                textTransform: "none",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                background: `linear-gradient(90deg, #2e7d32, #1b5e20)`,
                "&:hover": {
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Add New Group
            </Button>
          </Stack>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            height: 650,
            width: "100%",
            overflow: "hidden",
            borderRadius: 3,
            "& .table-header": {
              backgroundColor: "rgba(46, 125, 50, 0.08)",
              color: "#1b5e20",
              fontWeight: 600,
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
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
          }}
        >
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            disableColumnMenu
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "white",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "white",
              },
              "& .MuiDataGrid-toolbarContainer": {
                backgroundColor: "white",
                padding: 2,
              },
              "& .MuiDataGrid-cell": {
                paddingLeft: 1,
                paddingRight: 1,
              },
            }}
          />
        </Paper>
      </Container>
    </AdminLayout>
  );
}

export default ChatManagement;
