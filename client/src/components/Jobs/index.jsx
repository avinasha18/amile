import React from 'react';
import JobFilters from '../Filters';
import JobList from '../JobsList';
import { useTheme } from '../../context/ThemeContext';

const JobsPage = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Scrollable Job List Section */}
      <div className={`flex-1 ${isDarkMode ? 'bg-[#000]' : 'bg-gray-100'} overflow-y-auto no-scrollbar`}>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-[#979696]">Find Internships</h1>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for jobs..."
              className={`w-full p-3 ${isDarkMode ? 'bg-[#131313] text-gray-100' : 'bg-white text-gray-900'} border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500`}
            />
          </div>
          <JobList />
        </div>
      </div>

      {/* Fixed Job Filters Section */}
      <div className="w-80 flex-shrink-0 overflow-y-auto no-scrollbar border-l border-gray-300">
        <JobFilters />
      </div>
    </div>
  );
};

export default JobsPage;