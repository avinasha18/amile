import React from "react";
import { FaMoneyBillAlt, FaCalendarAlt, FaHandPointRight, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/jobDetail', { state: { job } }); // Pass the job data via state
  };

  return (
    <div className="bg-[#0f1011] rounded-lg shadow-md overflow-hidden no-scrollbar">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className="text-xl font-bold text-gray-300">{job.title}</h3>
              <p className="text-gray-500">{job.company} | {job.location}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${job.remote ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
            {job.type}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <FaMoneyBillAlt className="mr-2" /> {job.salary}
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" /> {job.startDate}
          </div>
          <div className="flex items-center">
            <FaHandPointRight className="mr-2" /> {job.openings}
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2" /> {job.experience}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={handleViewDetails} className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
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
