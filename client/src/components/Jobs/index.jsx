import React from 'react';
import JobFilters from '../Filters';
import JobList from '../JobsList';

const JobsPage = () => {
  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 bg-[#000000]">
        <h1 className="text-3xl font-bold mb-6 text-[#a6a6ae]">Find Internships</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for jobs..."
            className="w-full p-3 bg-[#171717] border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-100"
          />
        </div>
        <JobList />
      </div>
      <JobFilters />
    </div>
  );
};

export default JobsPage;
