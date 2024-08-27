import React, { useState } from 'react';
import JobList from '../JobsList';
import { useTheme } from '../../context/ThemeContext';
import JobFilters from '../Filters'
const JobsPage = () => {
  const { isDarkMode } = useTheme();
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`flex-1 ${isDarkMode ? 'bg-[#000]' : 'bg-gray-100'} overflow-y-auto no-scrollbar`}>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-[#979696]">Find Internships</h1>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for internships..."
              value={searchQuery}
              onChange={handleSearch}
              className={`w-full p-3 ${isDarkMode ? 'bg-[#131313] text-gray-100' : 'bg-white text-gray-900'} border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500`}
            />
          </div>
          <JobList filters={filters} searchQuery={searchQuery} />
        </div>
      </div>

      <div className="w-80 flex-shrink-0 overflow-y-auto no-scrollbar border-l border-gray-300">
        <JobFilters onApplyFilters={handleApplyFilters} />
      </div>
    </div>
  );
};

export default JobsPage;