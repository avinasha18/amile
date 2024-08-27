import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import SendIcon from '@mui/icons-material/Send';

function MessageInput({ sendMessage }) {
  const [message, setMessage] = useState('');
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
        p: 1,
        width: '100%',
        maxWidth: '650px',
      }}
    >
      <TextField
        multiline
        maxRows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        variant="outlined"
        fullWidth
        onKeyDown={handleKeyDown}
        sx={{
          flexGrow: 1,
          backgroundColor: isDarkMode ? '#333' : '#fff',
          color: isDarkMode ? '#fff' : '#000',
          '& .MuiInputBase-root': {
            color: isDarkMode ? '#fff' : '#000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: isDarkMode ? '#666' : '#ccc',
            },
            '&:hover fieldset': {
              borderColor: isDarkMode ? '#888' : '#aaa',
            },
            '&.Mui-focused fieldset': {
              borderColor: isDarkMode ? '#aaa' : '#666',
            },
          },
        }}
      />
      {message.trim() && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          <SendIcon />
        </Button>
      )}
    </Box>
  );
}

export default MessageInput;
