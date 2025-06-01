import React from "react";
import Header from "./Header";
import { Grid, Typography, Box } from "@mui/material";

const AppLayout = () => (WrappedComponent) => {
   
  return (props) => {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header />

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            width: "100%",
            overflow: "hidden",
          }}
        >
      
          <Box
            sx={{
              width: "33.33%",
              bgcolor: "#f0f0f0",
              p: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Typography variant="h6">First Section</Typography>
          </Box>

      
          <Box
            sx={{
              width: "33.33%",
              bgcolor: "#f8f8f8",
              p: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <WrappedComponent {...props} />
          </Box>

         
          <Box
            sx={{
              width: "33.33%",
              bgcolor: "#f0f0f0",
              p: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Typography variant="h6">Third Section</Typography>
          </Box>
        </Box>
      </Box>
    );
  };
};

export { AppLayout };
export default AppLayout;
