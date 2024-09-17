import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { MdOutlineTrendingUp, MdOutlineWork } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';
import Cookies from 'js-cookie';
import { Actions } from '../../hooks/actions';
const SkillAssessment = () => {
  const { isDarkMode } = useTheme(); // ThemeContext hook
  const [feedback, setFeedback] = useState([]);
  const [userData, setUserData] = useState({});
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await Actions.fetchUser();
      console.log(response)
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const fetchProgressData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/course-progress/${userData._id}`);
      setProgress(response.data);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  }, [userData._id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (userData._id) {
      fetchProgressData();
    }
  }, [fetchProgressData, userData._id]);

  useEffect(() => {
    // Generate feedback based on user data
    if (userData.skills && progress.length) {
      const skillFeedback = userData.skills.map(skill => {
        const progressItem = progress.find(p => p.courseName === skill);

        let status = 'Needs Improvement';
        let nextStep = 'Consider taking relevant courses or practicing more.';

        if (progressItem) {
          status = progressItem.totalProgress > 75 ? 'Excellent' : 'Needs Improvement';
          nextStep = `Complete more exercises in ${progressItem.courseName}.`;
        }

        return {
          area: skill,
          status,
          icon: status === 'Excellent' ? <FaCheckCircle className="text-green-500" /> : <FaExclamationCircle className="text-red-500" />,
          nextStep
        };
      });

      setFeedback(skillFeedback);
    }
    setLoading(false);
  }, [userData, progress]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${isDarkMode ? 'bg-black text-gray-200' : 'bg-white text-slate-900'} p-6 w-full overflow-y-auto min-h-screen transition-colors duration-500`}>
      
      {/* Header Section */}
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-slate-900'} p-4 shadow-md rounded-lg mb-6`}>
        <h1 className="text-3xl font-bold">Welcome, {userData.name || 'John Doe'}</h1>
        <p className="mt-2">Here's your personalized skill assessment and feedback from Amile.</p>
      </div>

      {/* Feedback Cards Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {feedback.map((item, index) => (
          <div
            key={index}
            className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-slate-900'} p-4 rounded-lg shadow-md flex flex-col justify-between transition-colors duration-500`}
          >
            <div className="flex items-center">
              {item.icon}
              <h2 className="ml-3 text-xl font-semibold">{item.area}</h2>
            </div>
            <p className="mt-2">Status: <span className="font-medium">{item.status}</span></p>
            <p className="mt-2">Next Step: {item.nextStep}</p>
          </div>
        ))}
      </div>

      {/* Real-time Market Insights */}
      <div className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-slate-900'} mt-6 p-6 shadow-md rounded-lg`}>
        <h2 className="text-2xl font-bold mb-4">Real-time Market Insights</h2>
        <div className="grid gap-4 grid-cols-2">
          <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg shadow-md flex items-center">
            <MdOutlineTrendingUp className="text-green-600 text-4xl" />
            <p className="ml-4 text-white">JavaScript demand has increased by 20% in the last 6 months.</p>
          </div>
          <div className="bg-red-100 dark:bg-red-800 p-4 rounded-lg shadow-md flex items-center">
            <MdOutlineWork className="text-red-600 text-4xl" />
            <p className="ml-4 text-white">Python jobs are trending for AI-based roles.</p>
          </div>
        </div>
      </div>

      {/* Progress Tracking Section */}
      <div className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-slate-900'} mt-6 p-6 shadow-md rounded-lg`}>
        <h2 className="text-2xl font-bold mb-4">Progress on Updating Skills</h2>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progress.reduce((acc, course) => acc + course.totalProgress, 0) / progress.length || 0}%` }}></div>
        </div>
        <p className="mt-2">{progress.length ? `Progress updated based on ${progress.length} courses.` : 'No course progress data available.'}</p>
      </div>

      {/* Next Steps Section */}
      <div className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-slate-900'} mt-6 p-6 shadow-md rounded-lg mb-[30px]`}>
        <h2 className="text-2xl font-bold mb-4">Next Steps Recommended by Amile</h2>
        <ul className="list-disc list-inside">
          <li>Complete "Advanced React Patterns" to improve your JavaScript skills.</li>
          <li>Take the "CSS Mastery" course for better design skills.</li>
          <li>Work on 2 more ML-based projects to strengthen your Python profile.</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillAssessment;
