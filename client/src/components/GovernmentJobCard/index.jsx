import React, { useState, useEffect } from "react";
import { FaMoneyBillAlt, FaCalendarAlt, FaHandPointRight, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Oval } from 'react-loader-spinner';

const GovtJobCard = ({ job, onApply }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);
  const currentUser = JSON.parse(Cookies.get('user') || '{}');
  const location = useLocation();

  useEffect(() => {
    const checkApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/government/applications/${currentUser.id}`);
        const appliedJobs = response.data.map(app => app._id);
        setIsApplied(appliedJobs.includes(job._id));
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };

    checkApplication();
  }, [job._id, currentUser.id]);

  const handleViewDetails = () => {
    navigate(`/governmentDetailed/${job.jobId}`);
  };

  setTimeout(() => setIsLoading(false), 1000);

  const handleApply = async () => {
    try {
      const response = await axios.post('http://localhost:3000/government/apply', {
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

  if (isApplied) return null; // Don't render the card if the user has already applied

  return (
    <div className={`${isDarkMode ? 'bg-[#0f1011]' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <img src={job.logo} alt={`${job.companyName} logo`} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className={`${isDarkMode ? 'text-gray-300' : 'text-black'} text-xl font-bold`}>{job.jobTitle}</h3>
              <p className="text-gray-500">{job.companyName} | {job.location}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-md ${job.jobType === 'Full Time' ? 'bg-blue-500 text-blue-100' : 'bg-green-500 text-green-100'}`}>
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
            <FaMoneyBillAlt className="mr-2" /> {job.salary ? `$${job.salary.toLocaleString()}` : 'Unpaid'}
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" /> Posted At: {new Date(job.postedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" /> End Date: {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : 'N/A'}
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2" /> No of openings: {job.numberOfOpenings}
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

export default GovtJobCard;
