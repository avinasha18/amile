import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { Oval } from 'react-loader-spinner';
import { FaArrowLeft, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaClock, FaUsers, FaGraduationCap } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const GovernmentDetailedPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isApplied, setIsApplied] = useState(false);
  const currentUser =Cookies.get('userId') 

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/government/${id}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    const checkApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/government/applications/${currentUser.id}`);
        console.log(response)
        const appliedJobs = response.data.map(app => app._id);
        setIsApplied(appliedJobs.includes(job?._id));
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };

    if (job) {
      checkApplication();
    }
  }, [job, currentUser]);

  const handleApply = async () => {
    try {
      const response = await axios.post('http://localhost:3000/government/apply', {
        internshipId: job._id,
        studentId: currentUser,
        companyId: job.companyId
      });

      if (response.status === 201) {
        toast.success("Application submitted successfully", {
          position: "bottom-center",
        });
        setIsApplied(true);
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
          onClick={() => navigate('/government')}
          className={`flex items-center ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors mb-6`}
        >
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </button>
        <div className={`rounded-lg p-6 mb-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {job.logo && (
                <img src={job.logo} alt={`${job.companyName} logo`} className="w-16 h-16 rounded-full mr-4" />
              )}
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{job.jobTitle}</h1>
                <p className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{job.companyName}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm ${job.jobType === 'Full-time' ? (isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800') : (isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800')}`}>
              {job.jobType}
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 h-auto">
          <div className="lg:w-2/3">
            <section className={`rounded-lg p-6 mb-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Job Description</h2>
              <p className="mb-4">{job.jobDescription}</p>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Qualifications:</h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{job.qualifications}</p>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Responsibilities:</h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{job.responsibilities}</p>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Benefits:</h3>
              <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <li key={job._id}>{job?.benefits}</li>
              </ul>
            </section>
            <section className={`rounded-lg p-6 mb-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About {job.companyName}</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{job.companyDescription}</p>
            </section>
          </div>
          <div className="lg:w-1/3">
            <div className={`rounded-lg p-6 mb-8 shadow-lg sticky top-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Info</h2>
              <div className="space-y-3">
                <InfoItem icon={<FaMapMarkerAlt className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={job.location.join(', ')} />
                <InfoItem icon={<FaMoneyBillWave className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`Stipend: ₹${job.salary}`} />
                <InfoItem icon={<FaCalendarAlt className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`Start Date: ${new Date(job.startDate).toLocaleDateString()}`} />
                <InfoItem icon={<FaCalendarAlt className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`End Date: ${job.endDate ? new Date(job.endDate).toLocaleDateString() : 'N/A'}`} />
                <InfoItem icon={<FaClock className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`${job.duration} Months`} />
                <InfoItem icon={<FaUsers className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`${job.applicantsCount} applicants`} />
                <InfoItem icon={<FaGraduationCap className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`Min CGPA: ${job.minCGPA}`} />
              </div>
              <button
                className={`w-full mt-6 py-2 px-4 rounded-md transition-colors ${isDarkMode ? 'bg-blue-400 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                onClick={handleApply}
                disabled={isApplied}
              >
                {isApplied ? 'Applied' : 'Apply Now'}
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

export default GovernmentDetailedPage;
