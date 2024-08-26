import React, { useState } from 'react';

const Applied = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const applications = [
    { company: 'Cohesyve', profile: 'Full Stack Development Internship', appliedOn: '9 Aug \'24', applicants: 1277, status: 'Applied', review: 'Missing skill' },
  ];

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-black text-gray-200' : 'bg-white text-gray-800'} w-full`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My applications</h1>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <th className="py-2 px-4 text-left">COMPANY</th>
            <th className="py-2 px-4 text-left">PROFILE</th>
            <th className="py-2 px-4 text-left">APPLIED ON</th>
            <th className="py-2 px-4 text-left">NUMBER OF APPLICANTS</th>
            <th className="py-2 px-4 text-left">APPLICATION STATUS</th>
            <th className="py-2 px-4 text-left">REVIEW APPLICATION</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index} className={`${isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
              <td className="py-4 px-4">{app.company}</td>
              <td className="py-4 px-4">{app.profile}</td>
              <td className="py-4 px-4">{app.appliedOn}</td>
              <td className="py-4 px-4">{app.applicants}</td>
              <td className="py-4 px-4">
                <span className={`px-2 py-1 rounded ${getStatusColor(app.status, isDarkMode)}`}>
                  {app.status}
                </span>
              </td>
              <td className="py-4 px-4">{app.review}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getStatusColor = (status, isDarkMode) => {
  const colors = {
    Applied: isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
    'In-touch': isDarkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
    'Under review': isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
    'Response unlikely': isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
    'Not selected': isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800',
  };
  return colors[status] || '';
};

export default Applied;