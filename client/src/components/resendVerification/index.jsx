import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert, Paper, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { Actions } from '../../hooks/actions'; // Assuming you have an Actions module for API requests

export const ResendVerification = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleResendVerification = async () => {
        if (!username) {
            setSnackbarMessage('Please enter a username.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);

        try {
            const response = await Actions.resendVerification({ username });
            if (response.data.success) {
                setSnackbarMessage('Verification email sent successfully!');
                setSnackbarSeverity('success');
            } else {
                setSnackbarMessage(response.data.message || 'Failed to send verification email.');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage('An error occurred. Please try again.');
            setSnackbarSeverity('error');
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: isDarkMode ? 'black' : 'white' }}>
            <Paper
                elevation={3}
                sx={{ padding: 4, width: '100%', maxWidth: 400, bgcolor: isDarkMode ? '#fff' : '', color: isDarkMode ? '#000' : '#fff' }}
            >
                <Typography variant="h5" gutterBottom align="center">
                    Resend Verification Email
                </Typography>
                <TextField
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 3 }}
                    InputLabelProps={{
                        style: { color: isDarkMode ? '#000' : '#fff' }
                    }}
                    InputProps={{
                        style: { color: isDarkMode ? '#000' : '#fff' }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleResendVerification}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Verification'}
                </Button>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};
