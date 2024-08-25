// components/Navbar.js
import React, { useState } from "react";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setMenu] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`${isDarkMode ? 'bg-black text-gray-100' : 'bg-white text-gray-800'} shadow-md z-50 px-5 h-[70px] border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-[30px] font-bold animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Amile
        </h1>
        <nav className="hidden md:flex space-x-6">
          <NavItem>Dashboard</NavItem>
          <NavItem>Jobs</NavItem>
          <NavItem>Messages</NavItem>
        </nav>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
          </button>
          <div className="relative">
            <button
              onClick={() => setMenu(!isMenuOpen)}
              className="flex items-center space-x-2"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden md:inline">Account</span>
            </button>
            {isMenuOpen && <UserMenu isDarkMode={isDarkMode} />}
          </div>
        </div>
      </div>
    </header>
  );
};

// ... rest of the Navbar component remains the same
const NavItem = ({ children }) => (
  <a href="#" className="hover:text-blue-400 transition-colors">
    {children}
  </a>
);

const UserMenu = () => (
  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 text-gray-100">
    <MenuItem>Your Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
    <MenuItem>Sign out</MenuItem>
  </div>
);

const MenuItem = ({ children }) => (
  <a
    href="#"
    className="block px-4 py-2 text-sm hover:bg-gray-600 transition-colors"
  >
    {children}
  </a>
);

export default Navbar;
