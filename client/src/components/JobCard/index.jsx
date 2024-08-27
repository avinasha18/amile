import React, { useState, useEffect } from "react";
import { FaMoneyBillAlt, FaCalendarAlt, FaHandPointRight, FaUser } from 'react-icons/fa';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import {Oval} from 'react-loader-spinner'
import { useSelector } from "react-redux";
import { Avatar, Skeleton } from "@mui/material";
const JobCard = ({ job, onApply }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(true)
  const [isApplied, setIsApplied] = useState(false);
  const currentUser = useSelector((state)=>state.auth.user)
  useEffect(() => {
    const checkApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/applications/student/${currentUser}`);
        const appliedJobs = response.data.map(app => app._id);
        setIsApplied(appliedJobs.includes(job._id));
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };

    checkApplication();
  }, [job._id, currentUser]);

  const handleViewDetails = () => {
    // if(location.pathname === '/government'){
    //   navigate(`/governmentDetailed/${job.jobId}`)
    //   return
    // }
    navigate('/jobDetail', { state: { job } });
  };

  setTimeout(()=>setIsLoading(false),1000)


  const handleApply = async () => {
    try {
      const response = await axios.post('http://localhost:3000/applications', {
        internshipId: job._id,
        studentId: currentUser.id,
        companyId: job.companyId
      });

      if (response.status === 201) {
        toast.success("Application submitted successfully", {
          position: "bottom-center",
        });
        setIsApplied(true);
        onApply(job._id); // Notify parent component about the application
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warning(error.response.data.message, {
          position: "bottom-center",
        });
      } else {
        toast.error("Failed to submit application", {
          position: "bottom-center",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-${isDarkMode ? "black" : "gray-100"} p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {Array.from(new Array(10)).map((_, index) => (
            <div key={index} className={`p-4 bg-white ${isDarkMode?"dark:bg-gray-900":"dark:bg-gray-0"} rounded-md shadow-md `}>
            <div style={{display:"flex" , gap:15}}>

              <Skeleton variant="circular" width={80} height={80} sx={{ bgcolor: isDarkMode ? "grey.800" : "grey.300" }} />
              <Skeleton variant="text" width="40%" sx={{ fontSize: '0.5rem', bgcolor: isDarkMode ? "grey.800" : "grey.300", marginTop: '2rem' }} />
              <Skeleton variant="text" width="40%" sx={{ fontSize: '1rem', bgcolor: isDarkMode ? "grey.800" : "grey.300", marginTop: '0.5rem' }} />
              </div>
              <Skeleton variant="rectangular" width="100%" height={80} sx={{ bgcolor: isDarkMode ? "grey.800" : "grey.300", marginTop: '1rem' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  if (isApplied) return null;

  return (
    <div className={`${isDarkMode ? 'bg-[#0f1011]' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <Avatar src={job.logo} alt={`${job.companyName} logo`} className="w-12 h-12 rounded-full mr-4" size="large" />
            <div>
              <h3 className={`${isDarkMode ? 'text-gray-300' : 'text-black'} text-xl font-bold`}>{job.role}</h3>
              <p className="text-gray-500">{job.companyName} | {job.location}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${job.type === 'Full-Time' ? 'bg-blue-500 text-blue-100' : 'bg-green-500 text-green-100'}`}>
            {job.type}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skillsRequired.map((skill, index) => (
            <span key={index} className={`px-3 py-1 ${isDarkMode ? 'bg-gray-800' : 'bg-slate-300'} ${isDarkMode ? 'text-gray-300' : 'text-black'} rounded-full text-sm`}>
              {skill}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <FaMoneyBillAlt className="mr-2" /> {job.stipend ? `$${job.stipend.toLocaleString()}` : 'Unpaid'}
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" /> Start Date: {new Date(job.startDate).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" /> End Date: {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'N/A'}
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2" /> Experience: {job.experience}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={handleViewDetails} className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-900'} text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors`}>
            View Details
          </button>
          <button
            onClick={handleApply}
            className={`${isApplied ? 'bg-green-600' : 'bg-blue-600'} text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors`}
            disabled={isApplied}
          >
            {isApplied ? 'Applied' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
