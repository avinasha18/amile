import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { FaArrowLeft, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

const ScrappedDetailedPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/?page=1`);
        const jobDetails = response.data.jobs.find(job => job.link === decodeURIComponent(id));
        setJob(jobDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const SkeletonDetail = () => (
    <div className={`${isDarkMode ? 'bg-[#0f1011]' : 'bg-white'} rounded-lg shadow-md overflow-hidden animate-pulse w-full`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-300 rounded-full w-24"></div>
        </div>
        <div className="mb-4">
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 h-auto">
          <div className="lg:w-2/3">
            <div className={`rounded-lg p-6 mb-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className={`rounded-lg p-6 mb-8 shadow-lg sticky top-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-10 bg-gray-300 rounded w-full mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
   return <SkeletonDetail/>
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">No job details available.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full overflow-y-auto ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/others')}
          className={`flex items-center ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors mb-6`}
        >
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </button>
        <div className={`rounded-lg p-6 mb-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {job.icon && (
                <img src={job.icon} alt={`${job.job_info['Job Title']} logo`} className="w-16 h-16 rounded-full mr-4" />
              )}
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{job.job_info['Job Title']}</h1>
                <p className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{job.job_info['Work Location']}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm ${job.job_info['Employment Type'] === 'FULL TIME' ? (isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800') : (isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800')}`}>
              {job.job_info['Employment Type']}
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 h-auto">
          <div className="lg:w-2/3">
            <section className={`rounded-lg p-6 mb-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Job Description</h2>
              <p className="mb-4">{job.job_info['Description']}</p>
            </section>
          </div>
          <div className="lg:w-1/3">
            <div className={`rounded-lg p-6 mb-8 shadow-lg sticky top-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Info</h2>
              <div className="space-y-3">
                <InfoItem icon={<FaMapMarkerAlt className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={job.job_info['Work Location']} />
                <InfoItem icon={<FaMoneyBillWave className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`Stipend: ${job.job_info['Estimated salary']}`} />
                <InfoItem icon={<FaCalendarAlt className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`Posted Date: ${job.post_date}`} />
              </div>
              <button
                className={`w-full mt-6 py-2 px-4 rounded-md transition-colors ${isDarkMode ? 'bg-blue-400 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                onClick={() => window.open(job.apply_link, '_blank')}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center">
    {icon}
    <span>{text}</span>
  </div>
);

export default ScrappedDetailedPage;
