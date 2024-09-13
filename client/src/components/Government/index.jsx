import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import GovtJobCard from '../GovernmentJobCard';
import Cookies from 'js-cookie'; // Import Cookies for managing user data

const GovernmentJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); // Set loading to true before fetching

      // Retrieve user data from cookies
      const userCookie = Cookies.get('userId');
      const userId = userCookie

      if (!userId) {
        console.error("User not logged in or user ID not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/government?userId=${userId}`);

        setJobs(response.data);
        console.log(response.data)
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



  return (
    <div className={`min-h-screen w-full overflow-y-auto ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-900'}`}>
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
              <GovtJobCard job={job} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentJobsPage;
