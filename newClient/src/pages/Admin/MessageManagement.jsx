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
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  DeleteOutline,
  Edit,
  Message,
  Group,
  Person,
  Attachment as AttachmentIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { sampleMessageData } from "../../components/data/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages } from "../../redux/reducers/adminSlice";

function MessageManagement() {
  const dispatch = useDispatch();

  const { messages, loading, error } = useSelector(
    (state) => state.admin || {}
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, [dispatch]);

  console.log("Messages fetched:", messages);

  const rows = messages.map((message, index) => ({
    id: index + 1,
    content: message.content,
    attachment: message.attachments && message.attachments.length > 0,
    sender: message.sentBy.username,
    chat: message.chatName || "--",
    groupChat: message.groupChat,
    // Format: time first, then date (e.g., "10:30 AM, 04/27")
    time: message.createdAt
      ? `${new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}, ${new Date(message.createdAt).toLocaleDateString([], {
          month: "2-digit",
          day: "2-digit",
        })}`
      : "",
  }));

  const filteredData = rows.filter(
    (message) =>
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.chat.toLowerCase().includes(searchQuery.toLowerCase())
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
      field: "attachment",
      headerName: "Attachment",
      headerClassName: "table-header",
      width: 120,
      flex: 0.7,
      renderCell: (params) => (
        <Chip
          icon={<AttachmentIcon sx={{ fontSize: "1rem !important" }} />}
          label={params.value ? "Yes" : "No"}
          size="small"
          sx={{
            backgroundColor: params.value
              ? "rgba(25, 118, 210, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
            color: params.value ? "#1976d2" : "#616161",
            fontWeight: 600,
            minWidth: "60px",
          }}
        />
      ),
    },
    {
      field: "content",
      headerName: "Content",
      headerClassName: "table-header",
      width: 350,
      flex: 2.5,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "sender",
      headerName: "Sent By",
      headerClassName: "table-header",
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              bgcolor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
              fontSize: "0.75rem",
            }}
          >
            {params.value.charAt(0).toUpperCase()}
          </Avatar>
          <Typography sx={{ color: "#1976d2", fontWeight: 500 }}>
            @{params.value}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "chat",
      headerName: "Chat",
      headerClassName: "table-header",
      width: 180,
      flex: 1.2,
      renderCell: (params) => (
        <Typography sx={{ fontWeight: 500 }}>{params.value}</Typography>
      ),
    },
    {
      field: "groupChat",
      headerName: "Group Chat",
      headerClassName: "table-header",
      width: 120,
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          icon={
            params.value ? (
              <Group sx={{ fontSize: "1rem !important" }} />
            ) : (
              <Person sx={{ fontSize: "1rem !important" }} />
            )
          }
          label={params.value ? "Yes" : "No"}
          size="small"
          sx={{
            backgroundColor: params.value
              ? "rgba(46, 125, 50, 0.1)"
              : "rgba(25, 118, 210, 0.1)",
            color: params.value ? "#2e7d32" : "#1976d2",
            fontWeight: 600,
            minWidth: "60px",
          }}
        />
      ),
    },
    {
      field: "time",
      headerName: "Time",
      headerClassName: "table-header",
      width: 180,
      flex: 1.2,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            py: 0.5,
            px: 1,
            borderRadius: 1,
            fontWeight: 500,
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <AccessTimeIcon sx={{ fontSize: "0.875rem" }} />
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
              background: "#ed6c02", // Orange for messages
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
                color: "#ed6c02",
                mr: 1,
              }}
            >
              <Message
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  color: "warning.main",
                }}
              />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#ed6c02",
              }}
            >
              Message Management
            </Typography>

            <Box flexGrow={1} />

            <TextField
              placeholder="Search messages..."
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
                    borderColor: "#ed6c02",
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
            rows={filteredData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            disableColumnMenu
            sx={{
              border: "none",
              "& .table-header": {
                backgroundColor: "rgba(237, 108, 2, 0.08)",
                color: "#ed6c02",
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
              // Fix for content cells (especially message content)
              "& .MuiDataGrid-cell[data-field='content']": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
          />
        </Box>
      </Container>
    </AdminLayout>
  );
}
export default MessageManagement;
