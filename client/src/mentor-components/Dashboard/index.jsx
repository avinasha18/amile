import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Person, Feedback, School } from '@mui/icons-material'; // Importing icons from Material-UI
import { PiStudentFill } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { FiInfo } from "react-icons/fi";
import MentorProgress from './MentorProgress';
import { useTheme } from '../../context/ThemeContext';

const Dashboard = () => {
    const { isDarkMode } = useTheme();

    const studentsAssigned = 1234;

    const feedback = [
        { date: '2024-08-01', comment: 'Great mentor, very helpful!' },
        { date: '2024-08-10', comment: 'Needs to improve communication.' },
        { date: '2024-08-15', comment: 'Excellent at explaining concepts.' },
    ];

    const courses = [
        { title: 'Data Structures and Algorithms', students: 30 },
        { title: 'Web Development', students: 25 },
        { title: 'Machine Learning', students: 20 },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: `${isDarkMode ? 'black' : '#f8f8f8'}`,
                color: `${isDarkMode ? 'white' : 'black'}`,
                display: 'flex',
                flexDirection: 'column',
                padding: '24px',
                paddingBottom: '30px'
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    mb: '20px',
                    fontSize: '1.5rem',
                }}
            >
                Mentor Dashboard
            </Typography>

            {/* First Row: Cards */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                }}
            >
                {/* Students Card */}
                <Card
                    sx={{
                        background: `${isDarkMode ? 'linear-gradient(to right, #03346E, #021526)' : 'white'}`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        color: `${isDarkMode ? 'white' : 'black'}`,
                        borderRadius: '10px',
                        width: '31%',
                        height: '150px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                >
                    <div className='p-8'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-shrink-0 items-center gap-2 mb-2'>
                                <PiStudentFill className='text-2xl'/>
                                <h1 className='text-lg font-semibold'>Students Assigned</h1>
                            </div>
                            <button className='p-1 rounded-full hover:bg-gray-200'>
                                <FiInfo className='text-xl opacity-40'/>
                            </button>
                        </div>
                        <p className='text-2xl font-semibold font-mono'>{studentsAssigned}</p>
                    </div>
                </Card>

                <Card
                    sx={{
                        background: `${isDarkMode ? 'linear-gradient(to right, #03346E, #021526)' : 'white'}`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        color: `${isDarkMode ? 'white' : 'black'}`,
                        borderRadius: '10px',
                        width: '31%',
                        height: '150px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                >
                    <div className='p-8'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-shrink-0 items-center gap-2 mb-2'>
                                <PiStudentFill className='text-2xl'/>
                                <h1 className='text-lg font-semibold'>Students Assigned</h1>
                            </div>
                            <button className='p-1 rounded-full hover:bg-gray-200'>
                                <FiInfo className='text-xl opacity-40'/>
                            </button>
                        </div>
                        <p className='text-2xl font-semibold font-mono'>{studentsAssigned}</p>
                    </div>
                </Card>

                {/* Courses Card */}
                <Card
                    sx={{
                        background: `${isDarkMode ? 'linear-gradient(to right, #03346E, #021526)' : 'white'}`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        color: `${isDarkMode ? 'white' : 'black'}`,
                        borderRadius: '10px',
                        width: '31%',
                        height: '150px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                >
                    <div className='p-8'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-shrink-0 items-center gap-2 mb-2'>
                                <GiMoneyStack className='text-2xl'/>
                                <h1 className='text-lg font-semibold'>Total Revenue</h1>
                            </div>
                            <button className='p-1 rounded-full hover:bg-gray-200'>
                                <FiInfo className='text-xl opacity-40'/>
                            </button>
                        </div>
                        <p className='text-2xl font-semibold font-mono'>{studentsAssigned}</p>
                    </div>
                </Card>
            </Box>

            {/* Second Row: Graph */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5px',
                }}
            >
                <Card
                    sx={{
                        width: '70%',
                        height: '500px',
                        borderRadius: '20px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                >
                    <MentorProgress
                        sx={{
                            height: '100%',
                            width: '100%',
                            '& .line-graph': {
                                stroke: '#00c6ff',
                            },
                            '& .line-graph-text': {
                                color: '#dcdcdc',
                                fontSize: '0.8rem',
                            },
                        }}
                    />
                </Card>
            </Box>
        </Box>
    );
};

export default Dashboard;