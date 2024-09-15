import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { PluginConnectButton } from "../PluginButton";
import { Actions } from "../../hooks/actions";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../services/redux/AuthSlice";
import {  Box, Skeleton } from "@mui/material";
import axios from "axios";
import ProfileEditModal from "./ProfileEditModal";
import ProfileAvatar from "./profileAvatar";

const ProfilePage = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("Projects");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector((state) => state.auth.userData));
  const [resumeFile, setResumeFile] = useState(null); // State to hold the uploaded resume file
  const [resumeDetails, setResumeDetails] = useState(null);

  const tabs = [
    "Education",
    "Projects",
    "Experience",
    "Achievements",
    "Certifications",
    "POR",
  ];

  useEffect(() => {
    const GetUser = async () => {
      try {
        const response = await Actions.fetchUser();
        if (response.data.success) {
          dispatch(setUserData(response.data.data));
          setUser(response.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    GetUser();
  }, []);

  const updateUser = async (data) => {
    try {
      const response = await Actions.UpdateStudent(data);
      if (response.data.success) {
        dispatch(setUserData(response.data.updatedUser));
        setUser(response.data.updatedUser);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      const formData = new FormData();
      formData.append("resume", file);
      try {
        const response = await axios.post('http://127.0.0.1:5000/uploadresume', formData)
        if (response.data.success) {
          setResumeDetails(response.data.resumeDetails); // Set extracted resume details
        }
      } catch (e) {
        console.error("Error uploading resume:", e);
      }
    }
  };

  const themeStyles = {
    background: isDarkMode ? "bg-black" : "bg-gray-100",
    text: isDarkMode ? "text-gray-300" : "text-gray-800",
    heading: isDarkMode ? "text-white" : "text-gray-900",
    card: isDarkMode ? "bg-gray-900" : "bg-white",
    cardBorder: isDarkMode ? "border-gray-800" : "border-gray-200",
    input: isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800",
    button: isDarkMode
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-blue-500 hover:bg-blue-600",
    tabActive: isDarkMode ? "bg-blue-600" : "bg-blue-500",
    tabInactive: isDarkMode ? "bg-gray-800" : "bg-gray-200",
    skillTag: isDarkMode
      ? "bg-gray-800 text-gray-300"
      : "bg-gray-200 text-gray-700",
  };

  const handlePluginConnect = async (pluginName, PluginData) => {
    const response = await Actions.ConnectPlugin({ pluginName, PluginData });
    if (response.data.success) {
      console.log(response.data);
    } else {
      console.log(response.data);
    }
  };
  const createSlug = (interest) => {
    return interest.toLowerCase().replace(/ /g, '-');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Education":
        return (
          <div>
            {user?.education?.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p>
                  {edu.school}, {edu.year}
                </p>
              </div>
            ))}
          </div>
        );
      case "Projects":
        return (
          <div>
            {user?.projects?.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text">
                    {project?.name || project?.title}
                  </h3>
                </div>
                <ul className="list-disc list-inside mb-4">
                  {project.description?.split(",")?.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p>
                  Link:{" "}
                  <a href={project?.link} className="text-blue-400">
                    {project?.link}
                  </a>
                </p>
              </div>
            ))}
          </div>
        );
      case "POR":
        return (
          <div>
            {user?.responsibilities?.map((responsibility, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">
                  {responsibility.title}
                </h3>
                <p>
                  {responsibility.organization}, {responsibility.duration}
                </p>
              </div>
            ))}
          </div>
        );
      case "Experience":
        return (
          <div>
            {user?.workExperience?.map((experience, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">
                  {experience?.position}
                </h3>
                <p>
                  {experience?.company}, {experience?.duration}
                </p>
              </div>
            ))}
          </div>
        );
      case "Achievements":
        return (
          <div>
            {user?.achievements?.map((achievement, index) => (
              <div key={index} className="mb-4">
                <p>{achievement}</p>
              </div>
            ))}
          </div>
        );
      case "Certifications":
        return (
          <div>
            {user?.certifications?.map((certification, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">
                  {certification?.title}
                </h3>
                <p>{certification?.description}</p>
                <p>
                  {certification?.issuer}, {certification?.year}
                </p>
                <div className="flex">
                  <a href={certification?.link} className="badge link">
                    {" "}
                    Certificate link
                  </a>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  return (
    <div
      className={`min-h-screen ${themeStyles.background} ${themeStyles.text} p-8 overflow-auto w-full no-scrollbar`}
    >
      <div className="max-w-6xl mx-auto flex lg:gap-5 flex-col lg:flex-row">
        {/* Profile Section */}
        <div
          className={`${themeStyles.card} rounded-lg p-6 mb-8 lg:w-3/4 md:w-100 border-2 ${themeStyles.cardBorder}`}
        >
          {user?.name ? (
            <>
              {" "}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                 <ProfileAvatar user={user}  isDarkMode={isDarkMode} setUser={setUser}/>

                  <div className="flex flex-col justify-center mt-2">
                    <h1 className={`text-2xl font-bold ${themeStyles.heading}`}>
                      {user.name}
                    </h1>
                    <div className="flex flex-row gap-3 items-center">
                      <p className="text-lg font-medium">You're interested in</p>
                      {user.selectedInterests?.map((interest, index) => {
                        return (
                          <Link
                            to={`/roadmap/${createSlug(interest)}`}
                            key={index}
                            className={`text-lg font-medium p-1 px-4 rounded-2xl ${themeStyles.skillTag}`}
                          >
                            {interest}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`${themeStyles.button} text-white px-4 py-2 rounded`}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
              <div className="flex gap-4">
                <a href={user?.linkedin} className="text-blue-400">
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={`https://github.com/${user?.github}`}
                  className={themeStyles.heading}
                  target="_blank"
                >
                  <FaGithub size={24} />
                </a>
                <a href={user?.portfolio} className="text-green-400">
                  <FaGlobe size={24} />
                </a>
              </div>

              {/* Resume Upload */}
              <div className="mt-6">
                <h3 className={`text-lg font-semibold ${themeStyles.heading}`}>
                  Upload Resume
                </h3>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="mt-2"
                />
              </div>

              {/* Display Resume Details */}
              {resumeDetails && (
                <div className="mt-4">
                  <h3 className={`text-lg font-semibold ${themeStyles.heading}`}>
                    Extracted Resume Details:
                  </h3>
                  <pre className="mt-2 p-4 bg-gray-100 rounded-lg">
                    {JSON.stringify(resumeDetails, null, 2)}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Skeleton variant="circular" width={80} height={80} />
                <Skeleton variant="rectangular" width={310} height={60} />
                <Skeleton variant="button" width={110} height={60} />
              </Box>

              <Skeleton variant="text" width={310} height={60} />
            </>
          )}

          {/* Tabs */}
          <div className={`${themeStyles.card} rounded-lg lg:p-6 mb-8 mt-6`}>
            <ul className="flex mb-4 gap-4 overflow-scroll no-scrollbar">
              {tabs.map((tab, index) => (
                <li key={index} className="flex items-center justify-center">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeTab === tab
                        ? themeStyles.tabActive
                        : themeStyles.tabInactive
                    } text-[15px] ${themeStyles.text}`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
            <div>{renderTabContent()}</div>
          </div>
        </div>

        {/* Right Side Section */}
        <div
          className={`${themeStyles.card} rounded-lg p-6 mb-8  lg:w-1/4 border-2 ${themeStyles.cardBorder}`}
        >
          {/* Social */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${themeStyles.heading} mb-2`}>
              Social
            </h3>
            <div className="flex gap-4 mb-2">
              <>
                <a
                  href={user?.linkedin}
                  target="_blank"
                  className="text-blue-400"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={`https://github.com/${user?.github}`}
                  target="_blank"
                  className={themeStyles.heading}
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={user?.portfolio}
                  target="_blank"
                  className="text-green-400"
                >
                  <FaGlobe size={24} />
                </a>
                <PluginConnectButton
                  pluginurl={"https://portfolionom.vercel.app"}
                  onSuccess={handlePluginConnect}
                  user={user?.myPortfolioPlugin}
                  isconnected={!!user?.myPortfolioPlugin}
                />
              </>
            </div>
          </div>

          <div className="mb-6 ">
            <h3 className={`text-lg font-semibold ${themeStyles.heading} mb-2`}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 mb-2 justify-between">
              {user?.skills?.map((skill, index) => (
                <div key={index} className="flex items-center ">
                  <span
                    className={`${themeStyles.skillTag} px-2 py-1 rounded text-sm mr-2`}
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ProfileEditModal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        user={user}
        onSave={updateUser}
      />
    </div>
  );
};

export default ProfilePage;
