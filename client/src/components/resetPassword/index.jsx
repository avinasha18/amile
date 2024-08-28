import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Snackbar, Alert, Paper, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import PageNotFound from '../noinfopage';
import { Actions } from '../../hooks/actions';

export const ResetPassword = () => {
    const [queryParams] = useSearchParams();
    const token = queryParams.get('token');
    const navigate = useNavigate();

    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    if (!token) {
        return <PageNotFound />;
    }

    const handleResetPassword = async () => {
        if (!email || !password || !confirmPassword) {
            setSnackbarMessage('Please fill in all fields.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        if (password !== confirmPassword) {
            setSnackbarMessage('Passwords do not match.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);

        try {
            const response = await Actions.resetPassword({ token, email, password });
            if (response.data.success) {
                setSnackbarMessage('Password reset successfully!');
                setSnackbarSeverity('success');
                navigate("/login", { replace: true });
            } else {
                setSnackbarMessage(response.data.message || 'Failed to reset password.');
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
                sx={{ padding: 4, width: '100%', maxWidth: 400, bgcolor: isDarkMode ? '#fff' : '#000', color: isDarkMode ? '#000' : '#fff' }}
            >
                <Typography variant="h5" gutterBottom align="center">
                    Reset Password
                </Typography>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 3 }}
                    InputLabelProps={{
                        style: { color: isDarkMode ? '#000' : '#fff' }
                    }}
                    InputProps={{
                        style: { color: isDarkMode ? '#000' : '#fff' }
                    }}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3 }}
                    InputLabelProps={{
                        style: { color: isDarkMode ? '#000' : '#fff' }
                    }}
                    InputProps={{
                        style: { color: isDarkMode ? '#000' : '#fff' }
                    }}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    onClick={handleResetPassword}
                    disabled={loading}
                    sx={{ position: 'relative' }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} /> : 'Reset Password'}
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
