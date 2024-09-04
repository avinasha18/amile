import React from 'react';
import { Skeleton } from '@mui/material';

const DashboardSkeleton = ({ isDarkMode }) => {
  return (
    <div className={`right-content overflow-y-auto no-scrollbar w-full p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Top Grid Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className={`rounded-lg shadow-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Skeleton variant="rectangular" width="100%" height={50} animation="wave" />
            <Skeleton variant="text" width="60%" height={30} style={{ margin: '10px 0' }} animation="wave" />
            <Skeleton variant="text" width="80%" animation="wave" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Skeleton variant="text" width="30%" height={40} style={{ marginBottom: '20px' }} animation="wave" />
          <Skeleton variant="rectangular" width="100%" height={300} animation="wave" />
        </div>
        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Skeleton variant="text" width="40%" height={40} style={{ marginBottom: '20px' }} animation="wave" />
          <Skeleton variant="circular" width={200} height={200} style={{ margin: '0 auto' }} animation="wave" />
          <Skeleton variant="text" width="80%" height={30} style={{ marginTop: '20px', margin: '0 auto' }} animation="wave" />
        </div>
      </div>

      {/* Carousel Section */}
      <h2 className='text-black text-2xl m-5'>
        <Skeleton variant="text" width="50%" animation="wave" />
      </h2>
      <div className="mt-6">
        <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
