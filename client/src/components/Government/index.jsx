import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { Oval } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import GovtJobCard from '../GovernmentJobCard';

const GovernmentJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/government');
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    filterJobs(event.target.value);
  };

  const filterJobs = (query) => {
    const filtered = jobs.filter(job =>
      job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
      job.companyName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Oval
          height={80}
          width={80}
          color={isDarkMode ? '#ffffff' : '#000000'}
          secondaryColor={isDarkMode ? '#ffffff' : '#000000'}
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Government Job Postings</h1>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-4 mb-6 rounded-lg shadow-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GovtJobCard job={job}  />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentJobsPage;
