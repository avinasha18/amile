import React from 'react';
import ReactFlow, { Background, Handle, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Container, Card, CardContent, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaCode, FaDatabase, FaChartLine, FaRobot, FaBrain, FaCloud } from 'react-icons/fa';

// Create a Material UI theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',  // Blue
        },
        secondary: {
            main: '#ff4081',  // Pink
        },
        background: {
            default: '#f5f5f5',  // Light grey background
        },
    },
    typography: {
        h4: {
            fontWeight: 700,
            color: '#333',
        },
        h6: {
            fontWeight: 500,
        },
        body1: {
            color: '#555',
        },
    },
});

// Custom Node Component for better styling with icons
const CustomNode = ({ data }) => {
    const icons = {
        'Programming Basics (Python, R)': <FaCode size={24} />,
        'Data Manipulation (Pandas, Numpy)': <FaDatabase size={24} />,
        'Statistics & Probability': <FaChartLine size={24} />,
        'Data Visualization (Matplotlib, Seaborn)': <FaChartLine size={24} />,
        'Machine Learning (Sklearn, Tensorflow)': <FaRobot size={24} />,
        'Deep Learning (Neural Networks)': <FaBrain size={24} />,
        'Big Data (Spark, Hadoop)': <FaCloud size={24} />,
    };

    return (
        <Box
            sx={{
                padding: '12px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                border: '1px solid #ddd',
                minWidth: '180px',
                textAlign: 'center',
                '&:hover': {
                    backgroundColor: '#f9f9f9',
                }
            }}
        >
            <Box sx={{ marginBottom: '8px' }}>
                {icons[data.label]}
            </Box>
            <Typography variant="body1" sx={{ fontWeight: '600', color: '#1976d2' }}>
                {data.label}
            </Typography>
            <Handle type="source" position="right" style={{ background: '#1976d2', width: 10, height: 10 }} />
            <Handle type="target" position="left" style={{ background: '#1976d2', width: 10, height: 10 }} />
        </Box>
    );
};

// Data for the nodes (roadmap stages) - spaced evenly in rows and columns
const nodeSpacingX = 400; // Horizontal spacing between nodes
const nodeSpacingY = 150; // Vertical spacing between nodes

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Programming Basics (Python, R)' }, type: 'custom' },
    { id: '2', position: { x: 0, y: nodeSpacingY }, data: { label: 'Data Manipulation (Pandas, Numpy)' }, type: 'custom' },
    { id: '3', position: { x: 100, y: nodeSpacingY * 2 }, data: { label: 'Statistics & Probability' }, type: 'custom' },
    { id: '4', position: { x: nodeSpacingX, y: 0 }, data: { label: 'Data Visualization (Matplotlib, Seaborn)' }, type: 'custom' },
    { id: '5', position: { x: nodeSpacingX, y: nodeSpacingY }, data: { label: 'Machine Learning (Sklearn, Tensorflow)' }, type: 'custom' },
    { id: '6', position: { x: nodeSpacingX, y: nodeSpacingY * 2 }, data: { label: 'Deep Learning (Neural Networks)' }, type: 'custom' },
    { id: '7', position: { x: nodeSpacingX * 2, y: nodeSpacingY }, data: { label: 'Big Data (Spark, Hadoop)' }, type: 'custom' },
];

// Data for the edges (connections between roadmap stages)
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#1976d2', strokeWidth: 2 } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#1976d2', strokeWidth: 2 } },
    { id: 'e1-4', source: '3', target: '4', animated: true, style: { stroke: '#1976d2', strokeWidth: 2 } },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#1976d2', strokeWidth: 2 } },
    { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#1976d2', strokeWidth: 2 } },
    { id: 'e5-7', source: '6', target: '7', animated: true, style: { stroke: '#1976d2', strokeWidth: 2 } },
];

const DataScientistRoadmap = () => {
    return (
        <ThemeProvider theme={theme}>

            {/* Container for the Roadmap Flow */}
            <Container maxWidth="lg" sx={{ marginTop: '1rem' }}>
                <Card sx={{ padding: '2rem', backgroundColor: '#fff' }}>
                    <CardContent>
                        {/* React Flow Component */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '70vh',
                            borderRadius: 2
                        }}>
                            <ReactFlowProvider>
                                <ReactFlow
                                    nodes={initialNodes}
                                    edges={initialEdges}
                                    nodeTypes={{ custom: CustomNode }} // Use custom node
                                    fitView
                                    style={{ width: '100%', height: '100%' }}
                                    zoomOnScroll={false}  // Disable zooming on scroll
                                    panOnScroll={false}   // Disable panning on scroll
                                    zoomOnPinch={false}   // Disable zooming on pinch
                                    panOnDrag={false}     // Disable panning on drag
                                    elementsSelectable={false}  // Disable selecting elements
                                >
                                    {/* Removed Controls component */}
                                    <Background color="#eee" gap={20} />
                                </ReactFlow>
                            </ReactFlowProvider>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export default DataScientistRoadmap;
