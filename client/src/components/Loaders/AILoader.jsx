import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const AILoader = ({ message = "AI is analyzing your profile and finding the perfect jobs for you..." }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: 4,
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 3,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          left: -50,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(180deg)' }
          }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          right: -30,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 4s ease-in-out infinite reverse',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(180deg)' }
          }
        }}
      />
      
      {/* Main content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <CircularProgress
          size={80}
          thickness={4}
          sx={{
            color: 'white',
            mb: 3,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }}
        />
        
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          🤖 AI Magic in Progress
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, maxWidth: '400px' }}>
          {message}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'white',
              animation: 'bounce 1.4s ease-in-out infinite both',
              '&:nth-of-type(1)': { animationDelay: '-0.32s' },
              '&:nth-of-type(2)': { animationDelay: '-0.16s' },
              '@keyframes bounce': {
                '0%, 80%, 100%': { transform: 'scale(0)' },
                '40%': { transform: 'scale(1)' }
              }
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'white',
              animation: 'bounce 1.4s ease-in-out infinite both',
              '&:nth-of-type(1)': { animationDelay: '-0.32s' },
              '&:nth-of-type(2)': { animationDelay: '-0.16s' },
              '@keyframes bounce': {
                '0%, 80%, 100%': { transform: 'scale(0)' },
                '40%': { transform: 'scale(1)' }
              }
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'white',
              animation: 'bounce 1.4s ease-in-out infinite both',
              '&:nth-of-type(1)': { animationDelay: '-0.32s' },
              '&:nth-of-type(2)': { animationDelay: '-0.16s' },
              '@keyframes bounce': {
                '0%, 80%, 100%': { transform: 'scale(0)' },
                '40%': { transform: 'scale(1)' }
              }
            }}
          />
        </Box>
        
        <Typography variant="caption" sx={{ mt: 2, opacity: 0.7, display: 'block' }}>
          This may take a few moments due to our free tier limitations...
        </Typography>
      </Box>
    </Box>
  );
};

export default AILoader;
