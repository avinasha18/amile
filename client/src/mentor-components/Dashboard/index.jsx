import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Person, Feedback, School } from '@mui/icons-material'; // Importing icons from Material-UI
import MentorProgress from './MentorProgress';

const Dashboard = () => {
    const students = [
        { name: 'John Doe', progress: '75%' },
        { name: 'Jane Smith', progress: '85%' },
        { name: 'Alice Johnson', progress: '95%' },
    ];

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
                background: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                padding: '24px',
                perspective: '1000px', // Perspective for 3D effect
                paddingBottom: '30px'
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'violet',
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
                        background: 'linear-gradient(to right, #43cea2, #185a9d)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        color: 'white',
                        borderRadius: '15px',
                        boxShadow: '0 15px 45px rgba(0, 0, 0, 0.4)', // Enhanced shadow
                        width: '31%',
                        height: '150px',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center' }}
                        >
                            <Person sx={{ mr: 1 }} /> Students Assigned
                        </Typography>
                        <ul style={{ listStyleType: 'none', padding: 0, fontSize: '0.8rem' }}>
                            {students.map((student, index) => (
                                <li key={index}>
                                    {student.name} - Progress: {student.progress}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Feedback Card */}
                <Card
                    sx={{
                        background: 'linear-gradient(to right, #ff9966, #ff5e62)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        color: 'white',
                        borderRadius: '15px',
                        boxShadow: '0 15px 45px rgba(0, 0, 0, 0.4)', // Enhanced shadow
                        width: '31%',
                        height: '150px',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center' }}
                        >
                            <Feedback sx={{ mr: 1 }} /> Feedback
                        </Typography>
                        <ul style={{ listStyleType: 'none', padding: 0, fontSize: '0.8rem' }}>
                            {feedback.map((item, index) => (
                                <li key={index}>
                                    {item.date}: {item.comment}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Courses Card */}
                <Card
                    sx={{
                        background: 'linear-gradient(to right, #ff512f, #f09819)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        color: 'white',
                        borderRadius: '15px',
                        boxShadow: '0 15px 45px rgba(0, 0, 0, 0.4)', // Enhanced shadow
                        width: '31%',
                        height: '150px',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center' }}
                        >
                            <School sx={{ mr: 1 }} /> Courses
                        </Typography>
                        <ul style={{ listStyleType: 'none', padding: 0, fontSize: '0.8rem' }}>
                            {courses.map((course, index) => (
                                <li key={index}>
                                    {course.title} - Students: {course.students}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
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
                        width: '90%',
                        height: '500px',
                        backgroundColor: 'transparent',
                        transformStyle: 'preserve-3d',
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