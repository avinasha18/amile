import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import { Box, Tabs, Tab } from '@mui/material';

// Initialize Highcharts 3D module for pie chart
Highcharts3D(Highcharts);

const data = [
    { month: 'Jan', progress: 50 },
    { month: 'Feb', progress: 65 },
    { month: 'Mar', progress: 80 },
    { month: 'Apr', progress: 70 },
    { month: 'May', progress: 85 },
    { month: 'Jun', progress: 90 },
];

// Gradient colors for pie slices
const gradientColors = [
    {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
            [0, '#FF5733'],
            [1, '#FFC300'],
        ],
    },
    {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
            [0, '#C70039'],
            [1, '#FF5733'],
        ],
    },
    {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
            [0, '#900C3F'],
            [1, '#C70039'],
        ],
    },
    {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
            [0, '#581845'],
            [1, '#900C3F'],
        ],
    },
    {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
            [0, '#FFC300'],
            [1, '#DAF7A6'],
        ],
    },
    {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
            [0, '#DAF7A6'],
            [1, '#FFC300'],
        ],
    },
];

// Line Chart options without 3D
const lineChartOptions = {
    chart: {
        type: 'spline', // Smooth curve
        backgroundColor: 'transparent',
    },
    title: {
        text: '',
    },
    xAxis: {
        categories: data.map((item) => item.month),
        title: { text: 'Month' },
        labels: { style: { color: '#fff', fontFamily: 'Arial, sans-serif' } },
    },
    yAxis: {
        title: { text: 'Progress (%)' },
        labels: { style: { color: '#fff', fontFamily: 'Arial, sans-serif' } },
    },
    plotOptions: {
        spline: {
            lineWidth: 4,
            marker: {
                enabled: false, // Disable markers
            },
            color: '#6EACDA'
        },
    },
    series: [
        {
            name: 'Progress',
            data: data.map((item) => item.progress),
        },
    ],
    credits: {
        enabled: false,
    },
};

// Pie Chart options with 3D
const pieChartOptions = {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0,
        },
        backgroundColor: 'transparent',
    },
    title: {
        text: '',
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45,
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend: true,
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y}%',
                style: {
                    color: '#E0E0E0',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
                distance: 15,
            },
            animation: {
                duration: 2000,
                easing: 'easeOutBounce',
            },
            borderColor: '#fff',
            borderWidth: 2,
            shadow: {
                color: 'rgba(0, 0, 0, 0.3)',
                offsetX: 3,
                offsetY: 3,
                opacity: 0.5,
                width: 8,
            },
            point: {
                events: {
                    mouseOver: function () {
                        const chart = this.series.chart;
                        chart.series[0].data.forEach((slice) => {
                            if (slice.sliced) {
                                slice.slice(false);
                            }
                        });
                        this.slice(true);
                    },
                },
            },
        },
    },
    series: [
        {
            name: 'Progress',
            data: data.map((item, index) => ({
                name: item.month,
                y: item.progress,
                color: gradientColors[index % gradientColors.length],
                sliced: false,
                selected: false,
            })),
        },
    ],
    credits: {
        enabled: false,
    },
};

const MentorProgress = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box
            sx={{
                padding: '20px',
                background: 'linear-gradient(135deg, #021526, #03346E)',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)', // Enhanced shadow
                margin: '0 auto',
                maxWidth: '900px',
                perspective: '1000px', // Adding perspective for 3D effect
            }}
        >
            <Box
                sx={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.5s'
                }}
            >
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    centered
                    textColor="primary"
                    indicatorColor="none"
                    sx={{ marginBottom: '20px' }}
                >
                    <Tab
                        label="Line Chart"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontFamily: 'Arial, sans-serif',
                            color: '#FFFFFF', // White text for better contrast
                            '&:hover': {
                                color: '#CCCCFF', // Slightly lighter color on hover
                            },
                        }}
                    />
                    <Tab
                        label="3D Pie Chart"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontFamily: 'Arial, sans-serif',
                            color: '#FFFFFF', // White text for better contrast
                            '&:hover': {
                                color: '#CCCCFF', // Slightly lighter color on hover
                            },
                        }}
                    />
                </Tabs>

                {selectedTab === 0 && (
                    <Box>
                        <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
                    </Box>
                )}

                {selectedTab === 1 && (
                    <Box>
                        <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default MentorProgress;