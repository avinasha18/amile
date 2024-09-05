import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Grow, Button } from '@mui/material';
import { keyframes } from '@emotion/react';

// Define keyframes for animations
const scoreAnimation = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

const performanceAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  50% { opacity: 0.7; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const buttonHoverAnimation = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function Feedback() {
    const [performanceColor, setPerformanceColor] = useState('#003262'); // Default color
    const location = useLocation();
    const { score } = location.state || { score: 'No score available' };

    const navigate = useNavigate();

    // Function to predict performance based on score
    const predictPerformance = (score) => {
        if (score === 'No score available') {
            return "";
        }
        if (score >= 8) {
            return 'Excellent';
        } else if (score >= 6) {
            return 'Good';
        } else if (score >= 4) {
            return 'Average';
        } else {
            return 'Needs Improvement';
        }
    };

    const performance = predictPerformance(score);

    // Set performance color based on the result
    useEffect(() => {
        switch (performance) {
            case 'Excellent':
                setPerformanceColor('#4caf50'); // Green
                break;
            case 'Good':
                setPerformanceColor('#ffeb3b'); // Yellow
                break;
            case 'Average':
                setPerformanceColor('#ff9800'); // Orange
                break;
            case 'Needs Improvement':
                setPerformanceColor('#f44336'); // Red
                break;
            default:
                setPerformanceColor('#003262'); // Default color
                break;
        }
    }, [performance]);

    return (
        <Box className={'bg-black w-full'}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '20px',
                // background: 'linear-gradient(-10deg, #000, #af4261, #42a5f5, #66bb6a)',
                background: '#42a5f5',

                backgroundSize: '400% 400%',
                animation: `${gradientAnimation} 15s ease infinite`,
            }}
        >
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        fontWeight="bold"
                        className="animate-gradient bg-gradient-to-r from-slate-200 via-yellow-500 to-white bg-clip-text text-transparent"
                        sx={{
                            textAlign: 'center',
                            fontFamily: "'Pacifico', cursive",
                            animation: `${scoreAnimation} 2s ease-out`,
                        }}
                    >
                        Amile Interview Score
                    </Typography>
                </Box>

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                        fontFamily: "'Pacifico', sans-serif",
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: '#fff',
                        mb: 4,
                    }}
                >
                    Glad that you have attended the interview
                </Typography>

                <Grow in timeout={1200}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.2)',
                            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                            borderRadius: 4,
                            p: 4,
                            backdropFilter: 'blur(10px)',
                            animation: `${scoreAnimation} 3s ease`,
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="p"
                            fontWeight="bold"
                            sx={{
                                fontFamily: "'Roboto', sans-serif",
                                fontStyle: 'italic',
                                textAlign: 'center',
                                color: '#fff',
                            }}
                        >
                            Your Interview Score out of 10:
                        </Typography>

                        <Typography
                            variant="h3"
                            component="p"
                            fontWeight="bold"
                            sx={{
                                mt: 2,
                                animation: `${scoreAnimation} 2s ease`,
                                fontFamily: "'Pacifico', sans-serif",
                                fontStyle: 'italic',
                                color: '#fff',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
                            }}
                        >
                            {score}
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 3,
                                animation: `${performanceAnimation} 2s ease`,
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="p"
                                fontWeight="bold"
                                sx={{
                                    fontFamily: "'Roboto', sans-serif",
                                    fontStyle: 'italic',
                                    color: '#fff',
                                }}
                            >
                                Performance:
                            </Typography>
                            <Typography
                                variant="h5"
                                component="p"
                                fontWeight="bold"
                                sx={{
                                    ml: 1,
                                    fontFamily: "'Roboto', sans-serif",
                                    fontStyle: 'semi-bold',
                                    color: performanceColor,
                                    textShadow: '2px 2px 6px rgba(0,0,0,0.5)',
                                }}
                                className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text"
                            >
                                {performance}
                            </Typography>
                        </Box>
                    </Box>
                </Grow>

                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Button
                        onClick={() => navigate('/')}
                        variant="contained"
                        sx={{
                            color: '#fff',
                            padding: '12px 30px',
                            borderRadius: '30px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontFamily: "'Roboto', sans-serif",
                            backgroundColor: '#ff6f61',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                backgroundColor: '#ff4081',
                                animation: `${buttonHoverAnimation} 0.3s ease-in-out forwards`,
                            },
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>

                <Typography
                    component="p"
                    sx={{
                        mt: 4,
                        color: '#f3ec78',
                        fontFamily: "'Roboto', sans-serif",
                        textAlign: 'center',
                        fontStyle: 'italic',
                        fontSize: '14px',
                    }}
                >
                    If you have any issues, feel free to reach out to our support team.
                </Typography>
            </Container>
        </Box>
    );
}

export default Feedback;
