import React from 'react';
import { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { MdOutlineTrendingUp, MdOutlineWork } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';

const SkillAssessment = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // ThemeContext hook

  const [feedback, setFeedback] = useState([
    {
      area: 'JavaScript',
      status: 'Excellent',
      icon: <FaCheckCircle className="text-green-500" />,
      nextStep: 'Start learning advanced React patterns.',
    },
    {
      area: 'CSS Grid & Flexbox',
      status: 'Needs Improvement',
      icon: <FaExclamationCircle className="text-red-500" />,
      nextStep: 'Complete the "CSS Mastery" course.',
    },
    {
      area: 'Python (Machine Learning)',
      status: 'Trending Skill',
      icon: <MdOutlineTrendingUp className="text-blue-500" />,
      nextStep: 'Focus on hands-on ML projects.',
    },
  ]);

  return (
    <div className={`${isDarkMode ? 'bg-black text-gray-200' : 'bg-white text-slate-900'} p-6 w-full overflow-y-auto min-h-screen transition-colors duration-500`}>
      

      {/* Header Section */}
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-slate-900'} p-4 shadow-md rounded-lg mb-6`}>
        <h1 className="text-3xl font-bold">Welcome, Vigna Ramtej</h1>
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
          <div className="bg-blue-600 h-4 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <p className="mt-2">60% completed in updating outdated skills.</p>
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
