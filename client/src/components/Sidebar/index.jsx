import React from 'react';
import { FaTachometerAlt, FaUser, FaClipboardList, FaEnvelope, FaSearch, FaBrain, FaBook, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <nav className="bg-[#000] text-gray-100 w-64 flex-shrink-0 hidden md:block border-r border-gray-700">
      <div className="p-4">
        <SidebarSection title="User">
          <SidebarItem icon={FaUser} label="Profile" />
          <SidebarItem icon={FaClipboardList} label="Applied" />
          <SidebarItem icon={FaEnvelope} label="Messages" />
        </SidebarSection>
        <SidebarSection title="Internships">
          <SidebarItem icon={FaSearch} label="Find Internships" />
          {/* <SidebarItem icon={FaBrain} label="AI Interviews"  /> */}

        {/* <li>
        <a href="#" className="flex items-center py-2 px-4 hover:bg-[#151515] rounded transition-colors">
            <Icon className="w-5 h-5 mr-3" />
            <span className="font-bold animate-gradient  bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">{label}</span>
        </a>
        </li> */}
       
            <a href="#" className="flex items-center py-2 px-4 hover:bg-[#151515] rounded transition-colors">
              <FaBrain  className="w-5 h-5 mr-3"/>
            <span className='  font-bold animate-gradient bg-gradient-to-r from-yellow-500 via-pink-500 to-violet-500 bg-clip-text text-transparent'>AI Interviewer</span>
            </a>
        </SidebarSection>
        <SidebarSection title="Courses">
          <SidebarItem icon={FaBook} label="Courses" />
        </SidebarSection>
        <SidebarSection title="Settings">
          <SidebarItem icon={FaCog} label="Settings" />
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

const SidebarItem = ({ icon: Icon, label }) => (
  <li>
    <a href="#" className="flex items-center py-2 px-4 hover:bg-[#151515] rounded transition-colors">
      <Icon className="w-5 h-5 mr-3" />
      <span className='text-gray-400'>{label}</span>
    </a>
  </li>
);

export default Sidebar;