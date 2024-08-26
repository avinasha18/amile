import React from 'react';
import { FaUserCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook

const DashboardBox = (props) => {
  const { isDarkMode } = useTheme(); // Hook to get the current theme mode

  return (
    <div className={`dashboardBox p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} style={{
      backgroundImage: `linear-gradient(to right, ${props.color?.[0]} , ${props.color?.[1]})`
    }}>
      {props.grow ? (
        <span className="chart"><FaArrowUp /></span>
      ) : (
        <span className="chart"><FaArrowDown /></span>
      )}

      <div className="flex justify-between w-full items-center mt-4">
        <div className="col1">
          <h6 className="text-white mb-0">Total Applications</h6>
          <span className="text-white">277</span>
        </div>

        <div>
          {props.icon && <span className="icon">{props.icon}</span>}
        </div>
      </div>

      <div className="flex items-center w-full mt-2">
        <div className="flex items-center">
          <span className={`percentage-indicator ${props.grow ? 'text-green-500' : 'text-red-500'} font-bold`}>
            {props.grow ? '▲' : '▼'}
          </span>
          <span className="text-white font-bold ml-2" style={{ fontSize: '1.2em' }}>
            {props.percentage || '0'}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardBox;
