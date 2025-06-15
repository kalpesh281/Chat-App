import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography, Box } from "@mui/material";

const Table = ({ rows, columns, pageSize = 5, heading, rowHeight = 52 }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100%",
        py: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: "#212121",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: 0,
            width: 60,
            height: 3,
            backgroundColor: "primary.main",
            borderRadius: 1,
          },
        }}
      >
        {heading}
      </Typography>

      <Box
        sx={{
          height: "calc(100vh - 230px)",
          width: "100%",
          "& .table-header": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
            color: "#1976d2",
            fontWeight: 600,
          },
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: 2,
            backgroundColor: "white",
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
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
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          rowHeight={rowHeight}
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
      </Box>
    </Container>
  );
};

export default Table;
