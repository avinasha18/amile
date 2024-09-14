import React, { useEffect, useState } from 'react';
import JobCard from '../JobCard';
import { useTheme } from '../../context/ThemeContext';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import Cookies from 'js-cookie';

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

const JobList = ({ filters, searchQuery }) => {
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
    const queryParams = new URLSearchParams({
      ...filters,
      page: pageNumber,
      limit: 10,
      search: searchQuery,
      userId: currentUserId,
    });

    try {
      const response = await fetch(`http://localhost:3000/internships?${queryParams.toString()}`);
      const data = await response.json();
      setJobs(data.internships || []);
      setIsLoading(false)
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching internships:', error.message);
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
    <div className={`bg-${isDarkMode ? 'black' : 'gray-100'} p-6`}>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6`}>
        {jobs.map(job => (
          <JobCard key={job._id} job={job} onApply={handleApply} />
        ))}
      </div>
      <div className="mt-4 mb-9 flex justify-center">
        <CustomPagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color={isDarkMode ? 'secondary' : 'primary'}
        />
      </div>
    </div>
  );
};

export default JobList;
