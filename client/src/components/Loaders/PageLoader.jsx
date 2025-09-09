import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const PageLoader = ({ message = "Loading...", size = 40 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        padding: 4,
        textAlign: 'center'
      }}
    >
      <CircularProgress
        size={size}
        thickness={4}
        sx={{
          mb: 2,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }}
      />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default PageLoader;
