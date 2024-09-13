import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { FaUser, FaClipboardList, FaEnvelope, FaSearch, FaBrain, FaBook, FaCog  , FaRobot , FaUserFriends
} from "react-icons/fa";

import { AiOutlineRobot,AiOutlineEllipsis } from 'react-icons/ai';
import { SiCompilerexplorer } from "react-icons/si";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../services/redux/sideBarToggleSlice";
import { IconButton } from "@mui/material";
import { TbFileCv } from "react-icons/tb";

const Sidebar = () => {
  const { isDarkMode } = useTheme();
  const isCollapsed = useSelector((state) => state.sidebar.isSidebar);
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location

  const switchSidebar = () => {
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    if (location.pathname.startsWith("/course")) {
      if (!isCollapsed) {
        dispatch(toggleSidebar());
      }
    }
  }, [location.pathname, isCollapsed, dispatch]);
  

  return (
    <nav
      className={`overflow-y-scroll no-scrollbar ${
        isDarkMode ? "bg-black text-gray-100" : "bg-white text-gray-800"
      } ${
        isCollapsed ? "w-20" : "w-64"
      } flex-shrink-0 hidden md:block border-r ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      } transition-all duration-300`}
    >
      <div className={isCollapsed ? "p-2" : "p-4"}>
        <div className={`flex align-middle ${!isCollapsed ? "justify-between" : "justify-center"}`}>
          {!isCollapsed && <h1 className="font-bold align-middle">User</h1>}
          <button
            onClick={switchSidebar}
            className={`focus:outline-none ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <IconButton style={{ color: isDarkMode ? "#fff" : "#000" }}>
              {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </button>
        </div>
        <SidebarSection isCollapsed={isCollapsed}>
          <SidebarItem
            icon={FaUser}
            label="Profile"
            isDarkMode={isDarkMode}
            to="/profile"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={FaClipboardList}
            label="Applied"
            isDarkMode={isDarkMode}
            to="/applied"
            isCollapsed={isCollapsed}
          />
           <SidebarItem
            icon={TbFileCv}
            label="Resume Builder"
            isDarkMode={isDarkMode}
            to="/resumebuilder"
            isCollapsed={isCollapsed}
          />
        </SidebarSection>

        <SidebarSection title="Internships" isCollapsed={isCollapsed}>
          <SidebarItem
            icon={AiOutlineRobot}
            label="For you 🔥"
            isDarkMode={isDarkMode}
            to="/airecommendations"
            isCollapsed={isCollapsed}
            gradient
          />
          <SidebarItem
            icon={GoVerified}
            isDarkMode={isDarkMode}
            label="Public Internships"
            to="/govt"
            isCollapsed={isCollapsed}
          />
           <SidebarItem
            icon={GoVerified}
            isDarkMode={isDarkMode}
            label="Other Internships"
            to="/others"
            isCollapsed={isCollapsed}
          />

          <SidebarItem
            icon={FaBrain}
            label="AI Interviewer"
            isDarkMode={isDarkMode}
            to="/aimock"
            isCollapsed={isCollapsed}
            gradient
          />
          <SidebarItem
            icon={SiCompilerexplorer}
            label="Code Playground"
            isDarkMode={isDarkMode}
            to="/compiler"
            isCollapsed={isCollapsed}
          />
        </SidebarSection>
        <SidebarSection title="Courses" isCollapsed={isCollapsed}>
          <SidebarItem
            icon={FaBook}
            label="Your Courses"
            to="/my-courses"
            isCollapsed={isCollapsed}
          />
        </SidebarSection>
        <SidebarSection title="Settings" isCollapsed={isCollapsed}>
        <SidebarItem
            icon={FaRobot}
            label="Chat with Amile"
            to="/chatbot"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={FaCog}
            label="Settings"
            to="/settings"
            isCollapsed={isCollapsed}
          />
        </SidebarSection>
      </div>
    </nav>
  );
};

const SidebarSection = ({ title, children, isCollapsed }) => (
  <div className="mb-5">
    {!isCollapsed && (
      <h6 className="text-gray-250 text-sm font-semibold mb-0">{title}</h6>
    )}
    <ul>{children}</ul>
  </div>
);

const SidebarItem = ({
  icon: Icon,
  label,
  isDarkMode,
  to,
  isCollapsed,
  gradient,
}) => (
  <li>
    {to ? (
      <Link
        to={to}
        className={`flex items-center py-2 px-4 gap-3 ${
          isDarkMode
            ? "hover:bg-[#fff] hover:text-[#121010]"
            : "hover:bg-[#121010] hover:text-[#fff]"
        } rounded transition-colors ${isCollapsed ? "justify-center" : ""}`}
      >
        <Icon className={`w-5 h-5`} />
        {!isCollapsed && (
          <span
            className={`${
              gradient
                ? "font-bold animate-gradient bg-gradient-to-r from-yellow-500 via-pink-500 to-violet-500 bg-clip-text text-transparent"
                : ""
            }`}
          >
            {label}
          </span>
        )}
      </Link>
    ) : (
      <a
        href={to}
        className={`flex items-center py-2 px-4 gap-3 ${
          isDarkMode
            ? "hover:bg-[#fff] hover:text-[#121010]"
            : "hover:bg-[#121010] hover:text-[#fff]"
        } rounded transition-colors ${isCollapsed ? "justify-center" : ""}`}
      >
        <Icon className={`w-5 h-5`} />
        {!isCollapsed && <span className="text-gray-400 me-2">{label}</span>}
      </a>
    )}
  </li>
);

export default Sidebar;
