import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import Cookies from 'js-cookie';
import axios from 'axios';
import AIJobCard from './JobCard';
import AILoader from '../Loaders/AILoader';
import { api } from '../../hooks/apis';

const CustomPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
  },
  '& .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: theme.palette.mode === 'dark' ? '#444444' : '#dddddd',
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
  },
  '& .MuiPaginationItem-root:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#555555' : '#cccccc',
  },
}));

const AIRecommendations = ({ filters, searchQuery }) => {
  const { isDarkMode } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('userId');
    if (userCookie) {
      setCurrentUserId(userCookie);
    }
  }, []);

  const fetchInternships = async (pageNumber) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      ...filters,
      page: pageNumber,
      limit: 10,
      search: searchQuery,
      userId: currentUserId,
    });

    try {
        const skill = await axios.get(`${api}/getSkills/${currentUserId}`)
        const skills = skill.data.skills.join(' ');
        console.log(skills)
      
        const response = await axios.post(
            `http://127.0.0.1:9000/recommend`,
            { skills : 'html css javascript react node express' }, // Replace this with your actual data structure
            { 
              headers: { 'Content-Type': 'application/json' },
              timeout: 30000 // 30 second timeout for ML model
            }
          );      
      const data = response.data;
      console.log(data)
      setJobs(data || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching AI recommendations:', error.message);
      setJobs([]);
      // Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchInternships(page);
    }
  }, [page, filters, searchQuery, currentUserId]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleApply = (appliedJobId) => {
    setJobs(prevJobs => prevJobs.filter(job => job._id !== appliedJobId));
  };

 

  return (
    <div className={`bg-${isDarkMode ? 'black' : 'gray-100'} p-6 overflow-y-auto w-full`}>
      <h1 className="text-3xl font-bold mb-6 text-[#979696]">AI Recommendations </h1>
      
      {isLoading ? (
        <AILoader 
          message="Our AI is analyzing your profile and finding the perfect jobs for you. This may take a moment due to our free tier limitations, but we're working hard to get you the best matches!" 
        />
      ) : (
        <>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6`}>
            {jobs.length > 0 ? (
              jobs.map(job => (
                <AIJobCard key={job._id} job={job} onApply={handleApply} />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No AI recommendations available
                </h3>
                <p className="text-gray-500">
                  Try updating your skills or check back later for new recommendations.
                </p>
              </div>
            )}
          </div>
          
          {jobs.length > 0 && (
            <div className="mt-4 mb-9 flex justify-center">
              <CustomPagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color={isDarkMode ? 'secondary' : 'primary'}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AIRecommendations;
