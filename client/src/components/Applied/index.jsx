import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTheme } from '../../context/ThemeContext'; // Adjust the import path as needed

const AppliedInternships = () => {
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [govtAppliedInternships, setGovtAppliedInternships] = useState([]);

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const { isDarkMode } = useTheme(); // Hook to get the current theme mode

  useEffect(() => {
    const userCookie = Cookies.get('userId');
    if (userCookie) {
     
      setCurrentUser(userCookie);
    } else {
      navigate('/login');
      return;
    }

    if (currentUser) {
      axios
        .get(`http://localhost:3000/applications/student/${currentUser}`)
        .then((response) => {
          setAppliedInternships(response.data.appliedInternshipsWithDetails);
          setGovtAppliedInternships(response.data.govtAppliedInternshipsWithDetails);

          console.log(response.data.govtAppliedInternshipsWithDetails)
        })
        .catch((error) => {
          toast.error('Failed to fetch applied internships.');
        });
    }
  }, [currentUser, navigate]);

  return (
    <div className={`p-6 h-full w-full overflow-y-auto ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Applied Internships</h1>
      </header>
      {currentUser ? (
        <>
          {appliedInternships.length === 0 ? (
            <p className="text-center text-lg">No internships applied for yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appliedInternships.map((internship) => (
                  <motion.div
                    key={internship._id}
                    className={`bg-${isDarkMode ? 'gray-900' : 'white'} shadow-lg rounded-lg p-6 transition-transform duration-300 ease-in-out transform hover:scale-105`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center mb-4">
                      <img src={internship.companyLogo} alt={internship.companyName} className="w-12 h-12 mr-4" />
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{internship.role}</h3>
                        <p className="text-sm text-gray-600">{internship.companyName}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{internship.location}</p>
                    <p className="text-sm text-gray-600 mb-1">Stipend: {internship.stipend}</p>
                    <p className="text-sm text-gray-600 mb-2">Duration: {new Date(internship.startDate).toLocaleDateString()} to {internship.endDate ? new Date(internship.endDate).toLocaleDateString() : 'Not specified'}</p>
                    <button
                      className={`px-4 py-2 text-sm font-semibold rounded ${getStatusColor(internship.applicationStatus)}`}
                    >
                      {internship.applicationStatus}
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Applied on: {new Date(internship.appliedAt).toLocaleDateString()}</p>
                  </motion.div>
                ))}
              </div>
              <h1 className="text-3xl font-bold my-2">Public Internships</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {govtAppliedInternships.map((internship) => (
                  <motion.div
                    key={internship._id}
                    className={`bg-${isDarkMode ? 'gray-900' : 'white'} shadow-lg rounded-lg p-6 transition-transform duration-300 ease-in-out transform hover:scale-105`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center mb-4">
                      <img src={internship[0].companyLogo} alt={internship[0].companyName} className="w-12 h-12 mr-4" />
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{internship[0].jobTitle}</h3>
                        <p className="text-sm text-gray-600">{internship[0].companyName}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{internship[0].location}</p>
                    <p className="text-sm text-gray-600 mb-1">Stipend: {internship[0].salary}</p>
                    <p className="text-sm text-gray-600 mb-2">Deadline: {new Date(internship[0].applicationDeadline).toLocaleDateString()} </p>
                    <button
                      className={`px-4 py-2 text-sm font-semibold rounded ${getStatusColor(internship[0].applicationStatus)}`}
                    >
                      {internship.applicationStatus}
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Applied on: {new Date(internship.appliedAt).toLocaleDateString()}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center p-4">
          <p className="text-lg font-semibold">You need to log in to view your applied internships.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

// Helper function to determine the status color
const getStatusColor = (status) => {
  switch (status) {
    case 'selected':
      return 'bg-green-500 text-white';
    case 'rejected':
      return 'bg-red-500 text-white';
    case 'pending':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export default AppliedInternships;
