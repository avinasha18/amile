import React, { useState } from 'react';
import { FaUser, FaClipboardList, FaBrain, FaBook, FaCog } from 'react-icons/fa';
import ToggleButton from '@mui/material/ToggleButton';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import './index.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [selected, setSelected] = useState(false);

    return (
        <nav className={`bg-[#000] text-gray-100 flex-shrink-0 hidden md:block border-r border-gray-700 transition-all duration-300 ${selected ? 'w-16' : 'w-64'} flex flex-col h-full`}>
            <ToggleButton
                value="check"
                selected={selected}
                onChange={() => setSelected(!selected)}
                sx={{ background: 'transparent' }}
            >
                <div className='bg-gray-900 w-10 h-10 flex justify-center items-center rounded-lg text-white'>
                    <ArrowForwardIosOutlinedIcon sx={{ fontSize: '15px' }} className={`${selected ? 'rotate-90' : ''}`} />
                </div>
            </ToggleButton>

            <div className={`${selected ? '' : 'p-4'} flex-grow h-4/5` }>
                <SidebarSection>
                    <Link to='/profile'>
                        <SidebarItem icon={FaUser} label={selected ? "" : "Profile"} />
                    </Link>
                    <SidebarItem icon={FaClipboardList} label={selected ? "" : "Students List"} />
                </SidebarSection>
                <SidebarSection>
                    <a href="/interview" className="flex items-center py-2 px-4 hover:bg-[#151515] rounded transition-colors">
                        <FaBrain className="w-5 h-5 mr-3" />
                        {
                            !selected ? (
                                <span className='font-bold animate-gradient bg-gradient-to-r from-yellow-500 via-pink-500 to-violet-500 bg-clip-text text-transparent'>AI Interviewer</span>
                            ) : (
                                <span></span>
                            )
                        }
                    </a>
                </SidebarSection>
                <SidebarSection>
                    <SidebarItem icon={FaBook} label={selected ? "" : "Courses"} />
                </SidebarSection>
            </div>

            {/* Bottom section */}
            <div className={`${selected ? '' : 'p-4'}`}>
                <SidebarSection>
                    <SidebarItem icon={FaCog} label={selected ? "" : "Settings"} />
                </SidebarSection>
            </div>
        </nav>
    );
};

const SidebarSection = ({ children }) => (
    <div className="mb-6">
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
