import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PageNotFound = () => {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state)=> state.theme.isDarkMode); 

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 3,
        backgroundColor: isDarkMode ? '#000' : '#fff',
        color: isDarkMode ? '#fff' : '#000', 
      }}
    >
      <Typography variant="h1" gutterBottom>
        AMILE
      </Typography>
    
      <Typography variant="h4" gutterBottom>
        Oops! You've entered the wrong page.
      </Typography>
      <Typography variant="h6" paragraph>
        It seems like the page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGoHome}
        sx={{
          marginTop: 2,
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '4px',
          backgroundColor: isDarkMode ? '#ffdd00' : '#007bff', 
          color: isDarkMode ? '#000' : '#fff', 
          '&:hover': {
            backgroundColor: isDarkMode ? '#e6c200' : '#0056b3', 
          },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
