import React, { useState, useEffect } from "react";
import { FaMoneyBillAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { api } from "../../hooks/apis";
const SkeletonCard = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#0f1011]" : "bg-white"
      } rounded-lg shadow-md overflow-hidden animate-pulse`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-4 bg-gray-300 rounded-full w-16"></div>
          <div className="h-4 bg-gray-300 rounded-full w-12"></div>
          <div className="h-4 bg-gray-300 rounded-full w-20"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-10 bg-gray-300 rounded w-24"></div>
          <div className="h-10 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job, onApply }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);
  const currentUser = Cookies.get("userId");
  const location = useLocation();

  useEffect(() => {
    // Check if the user has already applied for this job
    const checkApplication = async () => {
      try {
        const response = await axios.get(
          `${api}/applications/student/${currentUser}`
        );
        const appliedJobs = response?.data?.appliedInternshipsWithDetails.map(
          (app) => app._id
        );
        setIsApplied(appliedJobs.includes(job._id));
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };

    checkApplication();
  }, [job._id, currentUser]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = () => {
    navigate("/jobDetail", { state: { job } });
  };

  const handleApply = async () => {
    try {
      const response = await axios.post(`${api}/applications`, {
        internshipId: job._id,
        studentId: currentUser,
        companyId: job.companyId,
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
    return <SkeletonCard />;
  }

  if (isApplied) return null; // Don't render the card if the user has already applied

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#0f1011]" : "bg-white"
      } rounded-lg shadow-md overflow-hidden`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {/* <img src={job.logo} alt={`${job.companyName} logo`} className="w-12 h-12 rounded-full mr-4" /> */}
            <div
              className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mr-4"
              style={{ backgroundColor: "#000" }} // You can use any color you like
            >
              {job.companyName.charAt(0)}
            </div>
            <div>
              <h3
                className={`${
                  isDarkMode ? "text-gray-300" : "text-black"
                } text-xl font-bold`}
              >
                {job.role}
              </h3>
              <p className="text-gray-500">
                {job.companyName} | {job.location}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              job.type === "Full-Time"
                ? "bg-blue-500 text-blue-100"
                : "bg-green-500 text-green-100"
            }`}
          >
            {job.type}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skillsRequired.map((skill, index) => (
            <span
              key={index}
              className={`px-3 py-1 ${
                isDarkMode ? "bg-gray-800" : "bg-slate-300"
              } ${
                isDarkMode ? "text-gray-300" : "text-black"
              } rounded-full text-sm`}
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <FaMoneyBillAlt className="mr-2" />{" "}
            {job.stipend ? `$${job.stipend.toLocaleString()}` : "Unpaid"}
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" /> Start Date:{" "}
            {new Date(job.startDate).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" /> End Date:{" "}
            {job.endDate ? new Date(job.endDate).toLocaleDateString() : "N/A"}
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2" /> Experience: {job.experience}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handleViewDetails}
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-gray-900"
            } text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors`}
          >
            View Details
          </button>
          <button
            onClick={handleApply}
            className={`${
              isApplied ? "bg-green-600" : "bg-blue-600"
            } text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors`}
            disabled={isApplied}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default JobCard;
