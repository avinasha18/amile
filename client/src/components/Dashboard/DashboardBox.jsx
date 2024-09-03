import React from 'react';
import { FaUserCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook

const DashboardBox = ({ color, icon, grow, percentage, title, value }) => {
  const { isDarkMode } = useTheme(); // Hook to get the current theme mode

  return (
    <div className={`dashboardBox p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} style={{
      backgroundImage: `linear-gradient(to right, ${color?.[0]}, ${color?.[1]})`
    }}>
      {grow ? (
        <span className="chart"><FaArrowUp /></span>
      ) : (
        <span className="chart"><FaArrowDown /></span>
      )}

      <div className="flex justify-between w-full items-center mt-4">
        <div className="col1">
          <h6 className="text-white mb-0">{title}</h6>
          <span className="text-white">{value}</span>
        </div>

        <div>
          {icon && <span className="icon">{icon}</span>}
        </div>
      </div>

      <div className="flex items-center w-full mt-2">
        <div className="flex items-center">
          <span className={`percentage-indicator ${grow ? 'text-green-500' : 'text-red-500'} font-bold`}>
            {grow ? '▲' : '▼'}
          </span>
          <span className="text-white font-bold ml-2" style={{ fontSize: '1.2em' }}>
            {percentage || '0'}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardBox;
