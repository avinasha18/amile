import React from 'react';
import { FaTachometerAlt, FaUser, FaClipboardList, FaEnvelope, FaSearch, FaBrain, FaBook, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GoVerified } from "react-icons/go";

import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
  const { isDarkMode } = useTheme();

  return (
    <nav className={`${isDarkMode ? 'bg-black text-gray-100' : 'bg-white text-gray-800'} w-64 flex-shrink-0 hidden md:block border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="p-4">
      <SidebarSection title="User">
  <SidebarItem icon={FaUser} label="Profile" to="/profile" />
  <SidebarItem icon={FaEnvelope} label="Messages" to="/messages" />
  <SidebarItem icon={FaClipboardList} label="Applied" isDarkMode={isDarkMode} to='/applied' />
</SidebarSection>
        <SidebarSection title="Internships">
          {/* <SidebarItem icon={FaBrain} label="AI Interviews"  /> */}
          <Link to='/'><SidebarItem icon={FaSearch} label="Find Internships" /></Link>
          <Link to='/government'><SidebarItem icon={GoVerified} label="Public Internships" /></Link>

          {/* <li>
        <a href="#" className="flex items-center py-2 px-4 hover:bg-[#151515] rounded transition-colors">
            <Icon className="w-5 h-5 mr-3" />
            <span className="font-bold animate-gradient  bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">{label}</span>
        </a>
        </li> */}
       <Link to='/aimock'>
       <li  className="flex items-center py-2 px-4 hover:bg-[#151515] rounded transition-colors">
              <FaBrain  className="w-5 h-5 mr-3"/>
            <span className='  font-bold animate-gradient bg-gradient-to-r from-yellow-500 via-pink-500 to-violet-500 bg-clip-text text-transparent'>AI Interviewer</span>
            </li>
       </Link>
          
        </SidebarSection>
        <SidebarSection title="Courses">
          <SidebarItem icon={FaBook} label="Courses" to='/courses' />
        </SidebarSection>
        <SidebarSection title="Settings">
          <SidebarItem icon={FaCog} label="Settings" to='/settings' />
        </SidebarSection>
      </div>
    </nav>
  );
};

const SidebarSection = ({ title, children }) => (
  <div className="mb-6">
    <h6 className="text-gray-250 text-sm font-semibold mb-2">{title}</h6>
    <ul>{children}</ul>
  </div>
);
const SidebarItem = ({ icon: Icon, label, isDarkMode, to }) => (
  <li>
    {to ? (
      <Link to={to} className={`flex items-center py-2 px-4 ${isDarkMode ? 'hover:bg-[#b9b8b8]' : 'hover:bg-[#121010]'} rounded transition-colors`}>
        <Icon className="w-5 h-5 mr-3" />
        <span className='text-gray-400'>{label}</span>
      </Link>
    ) : (
      <a href="#" className={`flex items-center py-2 px-4 ${isDarkMode ? 'hover:bg-[#b9b8b8]' : 'hover:bg-[#121010]'} rounded transition-colors`}>
        <Icon className="w-5 h-5 mr-3" />
        <span className='text-gray-400'>{label}</span>
      </a>
    )}
  </li>
);

export default Sidebar;