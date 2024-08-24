import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, Grow, Button } from '@mui/material';
import { keyframes } from '@emotion/react';

// Define the keyframes for the score animation
const scoreAnimation = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

// Define the keyframes for performance animation
const performanceAnimation = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  50% { opacity: 0.5; transform: translateY(-5px); }
  100% { opacity: 1; transform: translateY(0); }
`;

function Feedback() {
    const [performanceColor, setPerformanceColor] = useState('#003262'); // Default color for label
    const location = useLocation();
    const { score } = location.state || { score: 'No score available' };

    // Function to predict performance based on the score
    const predictPerformance = (score) => {
        if (score === 'No score available') {
            return ""
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

    // Set the performanceColor based on the performance value when the component mounts
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
    }, [performance]); // Depend on performance value

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                animation: 'backgroundShift 8s ease-in-out infinite alternate',
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <img
                        src="https://madeinstone.com.au/wp-content/uploads/2023/07/envelope.webp"
                        alt="Envelope"
                        style={{ maxWidth: '150px', maxHeight: '150px' }}
                    />
                </Box>

                <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                        fontFamily: "'Pacifico', sans-serif",
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: '#1F305E'
                    }}
                >
                    Glad that you have attended the interview
                </Typography>

                <Grow in timeout={1000}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            p: 2,
                            boxShadow: 8,
                            borderRadius: 2,
                            backgroundColor: '#ffffff',
                            mt: 3,
                            opacity: 0.9,
                            maxWidth: 'xs',
                            minHeight: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="p"
                            color="#003262" // Static color for label
                            fontWeight="bold"
                            sx={{
                                mt: 2,
                                fontFamily: "'Roboto', sans-serif",
                                fontStyle: 'italic',
                                textAlign: 'center'
                            }}
                        >
                            Your Interview Score
                        </Typography>

                        <Typography
                            variant="h3"
                            component="p"
                            color="primary"
                            fontWeight="bold"
                            sx={{
                                mt: 2,
                                animation: `${scoreAnimation} 3s ease-in-out`,
                                fontFamily: "'Roboto Slab', serif",
                                fontStyle: 'italic',
                                textAlign: 'center'
                            }}
                        >
                            {score}
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="p"
                                color="#003262"
                                fontWeight="bold"
                                sx={{
                                    mt: 2,
                                    fontFamily: "'Roboto', sans-serif",
                                    fontStyle: 'italic',
                                    textAlign: 'center',
                                    animation: `${performanceAnimation} 2s ease-in-out`,
                                }}
                            >
                                Performance:
                            </Typography>

                            <Typography
                                variant="h5"
                                component="p"
                                color={performanceColor} // Dynamic color for performance value
                                fontWeight="bold"
                                sx={{
                                    mt: 2,
                                    ml: 1,
                                    fontFamily: "'Roboto', sans-serif",
                                    fontStyle: 'italic',
                                    textAlign: 'center',
                                    animation: `${performanceAnimation} 2s ease-in-out`,
                                }}
                            >
                                {performance}
                            </Typography>
                        </Box>
                    </Box>
                </Grow>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#ec3372',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '50px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontFamily: "'Roboto', sans-serif",
                            '&:hover': {
                                backgroundColor: '#ec407a',
                            },
                        }}
                    >
                        Back Home
                    </Button>
                </Box>

                <Typography
                    component="p"
                    color="#98817B"
                    sx={{
                        mt: 2,
                        fontFamily: "'Roboto', sans-serif",
                        fontStyle: 'italic',
                        textAlign: 'center',
                        fontSize: '15px'
                    }}
                >
                    If you have any issues, contact us.
                </Typography>
            </Container>
        </Box>
    );
}

export default Feedback;
