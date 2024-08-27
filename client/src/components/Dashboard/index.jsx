import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import DashboardBox from './DashboardBox';
import Carousel from './Carousel';
import { data, options, Cdata, Coptions } from "./Data";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook
// import { PieChartShad } from './PieChart';

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { isDarkMode } = useTheme(); 

  return (
    <div className={`right-content w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-6`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} grow={true} />
        <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<FaUserCircle />} />
        <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<FaUserCircle />} />
        <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<FaUserCircle />} />
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
    {/* <PieChartShad/> */}
        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold text-center mb-4">Course Activities</h2>
          <div className="relative h-64">
            <Doughnut data={Cdata} options={Coptions} />
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              75%
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
