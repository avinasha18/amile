import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import JobCard from './JobCard';
import Cookies from 'js-cookie';

const ScrappedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`https://web-scraps.onrender.com/geeksgod/?page=${currentPage}`);
        setJobs(response.data.jobs);
        setFilteredJobs(response.data.jobs);
        setTotalPages(Math.ceil(response.data.total_jobs / response.data.per_page));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    filterJobs(event.target.value);
  };

  const filterJobs = (query) => {
    const filtered = jobs.filter(job =>
      job.job_info['Job Title']?.toLowerCase().includes(query.toLowerCase()) ||
      job.job_info['Work Location']?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const SkeletonCard = () => (
    <div className={`${isDarkMode ? 'bg-[#0f1011]' : 'bg-white'} rounded-lg shadow-md overflow-hidden animate-pulse`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-4 bg-gray-300 rounded-full w-16"></div>
          <div className="h-4 bg-gray-300 rounded-full w-12"></div>
          <div className="h-4 bg-gray-300 rounded-full w-20"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-10 bg-gray-300 rounded w-24"></div>
          <div className="h-10 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen w-full overflow-y-auto ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Private Jobs</h1>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-4 mb-6 rounded-lg shadow-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            filteredJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))
          )}
        </div>
        <div className="flex justify-center my-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 rounded-md ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-800'} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <span className="mx-4">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 rounded-md ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-800'} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrappedJobs;
