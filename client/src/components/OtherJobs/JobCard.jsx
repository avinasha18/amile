import React from 'react';
import { FaMoneyBillAlt, FaCalendarAlt, FaHandPointRight, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const JobCard = ({ job }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/scrappedDetailed/${encodeURIComponent(job.link)}`);
  };

  const handleApply = () => {
    window.location.href = job.apply_link;
  };

  return (
    <div className={`${isDarkMode ? 'bg-[#0f1011]' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <img src={job.icon} alt={`${job.job_info['Job Title']} logo`} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className={`${isDarkMode ? 'text-gray-300' : 'text-black'} text-xl font-bold`}>{job.job_info['Job Title']}</h3>
              <p className="text-gray-500">{job.job_info['Work Location']} | {job.post_date}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full truncate text-md ${job.job_info['Employment Type'] === 'FULL TIME' ? 'bg-blue-500 text-blue-100' : 'bg-green-500 text-green-100'}`}>
            {job.job_info['Employment Type']}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <FaMoneyBillAlt className="mr-2" /> {job.job_info['Estimated salary'] ? job.job_info['Estimated salary'] : 'Unpaid'}
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" /> Posted At: {job.post_date}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={handleViewDetails} className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-900'} text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors`}>
            View Details
          </button>
          <button
            onClick={handleApply}
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors`}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;