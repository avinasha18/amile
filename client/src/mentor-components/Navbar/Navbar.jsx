import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import './index.css';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

const Navbar = () => {
  const [isMenuOpen, setMenu] = useState(false);
  const menuRef = useRef(null);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="bg-[#000] text-gray-100 shadow-md z-50 px-5 h-[70px] border-b border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <h1 className=" text-[30px] font-bold animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
            Amile
          </h1>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <NavItem>Dashboard</NavItem>
        </nav>
        <div className="relative flex flex-row gap-10 items-center" ref={menuRef}>
          <Link to="/messages">
            <Badge badgeContent={4} color="primary" variant="dot" anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
              <MailIcon />
            </Badge>
          </Link>
          <button
            onClick={() => setMenu(!isMenuOpen)}
            className="flex items-center space-x-2"
          >
            <FaUserCircle className="text-4xl" />
          </button>
          {isMenuOpen && <UserMenu />}
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ children }) => (
  <a href="#" className="hover:text-blue-400 transition-colors">
    {children}
  </a>
);

const UserMenu = () => (
  <div className="absolute top-10 right-0 mt-2 w-48 bg-slate-900 rounded-md shadow-lg py-1 text-gray-100">
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
