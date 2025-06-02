import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';

function Loader() {
  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress 
          size={60} 
          thickness={4}
        />
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          Loading...
        </Typography>
      </Box>
    </Fade>
  );
}

export default Loader;