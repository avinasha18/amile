import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import DashboardBox from './DashboardBox';
import Carousel from './Carousel';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook
import { getApplicationStatistics } from '../../hooks/actions';
import Cookies from 'js-cookie'
ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { isDarkMode } = useTheme(); // Hook to get the current theme mode
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const currentUserId =  Cookies.get('userId')
        const data = await getApplicationStatistics(currentUserId); // Replace 'user_id_here' with the actual user ID
        setStatistics(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatistics();
  }, []);

  if (!statistics) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        data: [200, 600, 400, 620, 750, 600],
        backgroundColor: (context) => {
          const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF8000', '#00FF80', '#F0EF22'];
          return colors[context.dataIndex % colors.length];
        },
        borderColor: (context) => {
          const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF8000', '#00FF80', '#E4EF12'];
          return colors[context.dataIndex % colors.length];
        },
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 800,
        ticks: {
          stepSize: 200,
        },
      },
    },
  };

  const Cdata = {
    datasets: [{
      data: [statistics.acceptedApplications, statistics.rejectedApplications],
      backgroundColor: [
        'rgb(65, 105, 225)',  // Royal Blue
        'rgb(230, 230, 250)', // Lavender
      ],
      borderWidth: 0,
    }],
  };

  const Coptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={`right-content overflow-y-auto no-scrollbar w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-6`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} title={'Total Applications'} value={statistics.totalApplications} grow={true} percentage={Math.round((statistics.acceptedApplications / statistics.totalApplications) * 100)} />
        <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<FaUserCircle />} title={'Pending'} value={statistics.pendingApplications} percentage={Math.round((statistics.rejectedApplications / statistics.totalApplications) * 100)} />
        <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<FaUserCircle />} title={'Accepted'}  value={statistics.acceptedApplications} percentage={Math.round((statistics.pendingApplications / statistics.totalApplications) * 100)} />
        <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<FaUserCircle />} title={'Rejected'}  value={statistics.rejectedApplications} percentage={Math.round((statistics.totalApplications / statistics.totalApplications) * 100)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Statistics</h2>
            <div>
              <span className="mr-2">Sort by</span>
              <select className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                <option>Yearly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
          <Bar data={data} options={options} />
        </div>
        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold text-center mb-4">Course Activities</h2>
          <div className="relative h-64">
            <Doughnut data={Cdata} options={Coptions} />
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {Math.round((statistics.acceptedApplications / statistics.totalApplications) * 100)}%
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Process</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
              <span>In process</span>
            </div>
          </div>
        </div>
      </div>
      <h2 className='text-black text-2xl m-5'>Trending on Amile 🔥</h2>
      <Carousel className="mt-6" />
    </div>
  );
}

export default Dashboard;
