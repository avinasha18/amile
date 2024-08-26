import React from "react";
import { FaMoneyBillAlt, FaCalendarAlt, FaHandPointRight, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const JobCard = ({ job }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/jobDetail', { state: { job } }); // Pass the job data via state
  };

  return (
    <div className={`${isDarkMode ? 'bg-[#0f1011]' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <img src={job.logo} alt={`${job.companyName} logo`} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className={`${isDarkMode ? 'text-gray-300' : 'text-black'} text-xl font-bold`}>{job.role}</h3>
              <p className="text-gray-500">{job.companyName} | {job.location}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${job.type === 'Full-Time' ? 'bg-blue-900 text-blue-300' : 'bg-green-900 text-green-300'}`}>
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
