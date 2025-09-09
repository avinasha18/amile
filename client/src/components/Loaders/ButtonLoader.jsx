import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const ButtonLoader = ({ size = 20, color = 'inherit' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <CircularProgress
        size={size}
        color={color}
        thickness={4}
        sx={{
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }}
      />
    </Box>
  );
};

export default ButtonLoader;
