import React, { useEffect, useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaPencilAlt,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { PluginConnectButton } from "../PluginButton";
import { Actions } from "../../hooks/actions";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../services/redux/AuthSlice";
import { Avatar, Box, Link, Skeleton } from "@mui/material";

const ProfilePage = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("Projects");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isEditingTagline, setIsEditingTagline] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const tabs = [
    "Education",
    "Projects",
    "Experience",
    "Achievements",
    "Certifications",
    "POR",
  ];
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
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

  const [newItem, setNewItem] = useState({});

  const handlePluginConnect = async (pluginName, PluginData) => {
    const response = await Actions.ConnectPlugin({ pluginName, PluginData });

    if (response.data.success) {
      console.log(response.data);
    } else {
      console.log(response.data);
    }
  };

  const handleEdit = (field, value) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleSocialEdit = (platform, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      social: { ...prevUser.social, [platform]: value },
    }));
  };

  const handleAddItem = (section) => {
    setUser((prevUser) => ({
      ...prevUser,
      [section]: [...prevUser[section], newItem],
    }));
    setNewItem({});
    setIsAdding(false);
  };

  const handleRemoveItem = (section, index) => {
    setUser((prevUser) => ({
      ...prevUser,
      [section]: prevUser[section].filter((_, i) => i !== index),
    }));
  };

  const handleSkillEdit = () => {
    setIsEditingSkills(!isEditingSkills);
  };

  const handleAddSkill = (newSkill) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: [...prevUser.skills, newSkill],
    }));
  };

  const handleRemoveSkill = (skillIndex) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: prevUser.skills.filter((_, index) => index !== skillIndex),
    }));
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
                <button
                  onClick={() => handleRemoveItem("education", index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Degree"
                  value={newItem.degree || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, degree: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="School"
                  value={newItem.school || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, school: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newItem.year || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, year: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => handleAddItem("education")}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Education
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1"
              >
                <FaPlus /> <span>Add Education</span>
              </button>
            )}
          </div>
        );
      case "Projects":
        return (
          <div>
            {user?.projects?.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {project?.name || project?.title}
                  </h3>
                  <button
                    onClick={() => handleRemoveItem("projects", index)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
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
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newItem.name || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <textarea
                  placeholder="Description (separate points with newlines)"
                  value={newItem.description || ""}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      description: e.target.value.split("\n"),
                    })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={newItem.technologies || ""}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      technologies: e.target.value.split(","),
                    })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Project Link"
                  value={newItem.link || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, link: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => handleAddItem("projects")}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Project
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1"
              >
                <FaPlus /> <span>Add Project</span>
              </button>
            )}
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
                <button
                  onClick={() => handleRemoveItem("responsibilities", index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newItem.title || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Organization"
                  value={newItem.organization || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, organization: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={newItem.duration || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, duration: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => handleAddItem("responsibilities")}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add POR
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1"
              >
                <FaPlus /> <span>Add Position of Responsibility</span>
              </button>
            )}
          </div>
        );
      case "Experience":
        return (
          <div>
            {user.workExperience.map((experience, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{experience.position}</h3>
                <p>
                  {experience.company}, {experience.duration}
                </p>
                <button
                  onClick={() => handleRemoveItem("workExperience", index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Position"
                  value={newItem.position || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, position: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={newItem.company || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, company: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={newItem.duration || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, duration: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => handleAddItem("workExperience")}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Experience
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1"
              >
                <FaPlus /> <span>Add Experience</span>
              </button>
            )}
          </div>
        );
      case "Achievements":
        return (
          <div>
            {user.achievements.map((achievement, index) => (
              <div key={index} className="mb-4">
                <p>{achievement}</p>
                <button
                  onClick={() => handleRemoveItem("achievements", index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Achievement"
                  value={newItem.achievement || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, achievement: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => handleAddItem("achievements")}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Achievement
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1"
              >
                <FaPlus /> <span>Add Achievement</span>
              </button>
            )}
          </div>
        );
      case "Certifications":
        return (
          <div>
            {user.certifications.map((certification, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{certification.title}</h3>
                <p>
                  {certification?.description}
                </p>
                <p>
                  {certification.issuer}, {certification.year}
                </p>
                <div className="flex">
                  <a href={certification?.link} className="badge"> Certificate link</a>
                  <button
                    onClick={() => handleRemoveItem("certifications", index)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={newItem.title || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Issuer"
                  value={newItem.issuer || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, issuer: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newItem.year || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, year: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Link"
                  value={newItem.link || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, link: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => handleAddItem("certifications")}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Certification
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1"
              >
                <FaPlus /> <span>Add Certification</span>
              </button>
            )}
          </div>
        );
      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  const handleTaglineEdit = () => {
    setIsEditingTagline(!isEditingTagline);
  };

  return (
    <div
      className={`min-h-screen ${themeStyles.background} ${themeStyles.text} p-8 overflow-auto w-full`}
    >
      <div className="max-w-6xl mx-auto flex gap-1">
        {/* Profile Section */}
        <div
          className={`${themeStyles.card} rounded-lg p-6 mb-8 w-3/4 border-2 ${themeStyles.cardBorder}`}
        >
          {user?.name ? (
            <>
              {" "}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Avatar
                    alt={user?.name?.toUpperCase()}
                    src={user?.profile}
                    className="w-24 h-24 rounded-full mr-6"
                    sx={{
                      width: 84,
                      height: 84,
                      bgcolor: isDarkMode ? "#fff" : "#000",
                      color: isDarkMode ? "#000" : "#fff",
                      fontSize: "60px",
                    }}
                  />

                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleEdit("name", e.target.value)}
                        className={`${themeStyles.input} px-2 py-1 rounded mb-2`}
                      />
                    ) : (
                      <h1
                        className={`text-2xl font-bold ${themeStyles.heading}`}
                      >
                        {user.name}
                      </h1>
                    )}
                    {isEditing ? (
                      <input
                        type="text"
                        value={user.title}
                        onChange={(e) => handleEdit("title", e.target.value)}
                        className={`${themeStyles.input} px-2 py-1 rounded mb-2`}
                      />
                    ) : (
                      <p>{user.title}</p>
                    )}
                    <p>{user.college}</p>
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
                <a href={user.linkedin} className="text-blue-400">
                  <FaLinkedin size={24} />
                </a>
                <a href={user.github} className={themeStyles.heading}>
                  <FaGithub size={24} />
                </a>
                <a href={user?.website} className="text-green-400">
                  <FaGlobe size={24} />
                </a>
              </div>
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
          <div className={`${themeStyles.card} rounded-lg p-6 mb-8 mt-6`}>
            <ul className="flex mb-4 gap-4">
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
          className={`${themeStyles.card} rounded-lg p-6 mb-8 ml-8 w-1.5/3 border-2 ${themeStyles.cardBorder}`}
        >
          {/* Social */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${themeStyles.heading} mb-2`}>
              Social
            </h3>
            <div className="flex gap-4 mb-2">
              {isEditingSocial ? (
                <>
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    value={user?.linkedin}
                    onChange={(e) =>
                      handleSocialEdit("linkedin", e.target.value)
                    }
                    className={`${themeStyles.input} px-4 py-2 rounded w-full`}
                  />
                  <input
                    type="text"
                    placeholder="GitHub URL"
                    value={user?.github}
                    onChange={(e) => handleSocialEdit("github", e.target.value)}
                    className={`${themeStyles.input} px-4 py-2 rounded w-full`}
                  />
                  <input
                    type="text"
                    placeholder="Website URL"
                    value={user?.website}
                    onChange={(e) =>
                      handleSocialEdit("website", e.target.value)
                    }
                    className={`${themeStyles.input} px-4 py-2 rounded w-full`}
                  />
                </>
              ) : (
                <>
                  <a href={user?.linkedin} className="text-blue-400">
                    <FaLinkedin size={24} />
                  </a>
                  <a href={user?.github} className={themeStyles.heading}>
                    <FaGithub size={24} />
                  </a>
                  <a href={user?.website} className="text-green-400">
                    <FaGlobe size={24} />
                  </a>
                  <PluginConnectButton
                    pluginurl={"https://portfolionom.vercel.app"}
                    onSuccess={handlePluginConnect}
                    user={user?.myPortfolioPlugin}
                    isconnected={!!user?.myPortfolioPlugin}
                  />
                </>
              )}
            </div>
            <button
              onClick={() => setIsEditingSocial(!isEditingSocial)}
              className={`${themeStyles.button} text-white px-4 py-2 rounded`}
            >
              {isEditingSocial ? "Save" : "Edit"}
            </button>
          </div>

          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${themeStyles.heading} mb-2`}>
              Tagline
            </h3>
            {isEditingTagline ? (
              <input
                type="text"
                placeholder="Tagline"
                value={user.tagline}
                onChange={(e) => handleEdit("tagline", e.target.value)}
                className={`${themeStyles.input} px-4 py-2 rounded w-full`}
              />
            ) : (
              <p>{user.tagline}</p>
            )}
            <button
              onClick={handleTaglineEdit}
              className={`${themeStyles.button} text-white px-4 py-2 rounded mt-2`}
            >
              {isEditingTagline ? "Save" : "Edit"}
            </button>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${themeStyles.heading} mb-2`}>
              Skills
            </h3>
            {isEditingSkills ? (
              <>
                <div className="flex flex-wrap gap-2 mb-2">
                  {user?.skills?.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <span
                        className={`${themeStyles.skillTag} px-2 py-1 rounded text-sm mr-2`}
                      >
                        {skill}
                      </span>
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add Skill"
                  className={`${themeStyles.input} px-4 py-2 rounded w-full mb-2`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddSkill(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </>
            ) : (
              <div className="flex flex-wrap gap-2 mb-2">
                {user?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className={`${themeStyles.skillTag} px-2 py-1 rounded text-sm`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={handleSkillEdit}
              className={`${themeStyles.button} text-white px-4 py-2 rounded mt-2`}
            >
              {isEditingSkills ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
