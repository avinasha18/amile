import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaRegBell } from "react-icons/fa";
import { TfiDashboard } from "react-icons/tfi";
import './index.css';
import { logout } from "../../services/redux/AuthSlice";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { setAuthToken } from "../../hooks/golbalAuth";
import SearchBox from "./SearchBox";

const MentorNavbar = () => {
  const [isMenuOpen, setMenu] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    setAuthToken(); // This clears the token from the axios headers
    navigate("/login");
  };

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
    <header className={`${isDarkMode ? "bg-black text-gray-100" : "bg-white text-gray-800"
      } shadow-md z-50 px-5 h-[70px] border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"
      } sticky top-0`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <SearchBox />
        <nav className="hidden md:flex space-x-6">
        </nav>
        <div className="relative flex flex-row gap-10 items-center" ref={menuRef}>
          <Link to="/mentor/dashboard">
            <TfiDashboard className="text-2xl"/>
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-600" />
            )}
          </button>
          <Link to="/messages">
            <Badge badgeContent={4} color="primary" variant="dot" anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
              <FaRegBell className="text-xl" />
            </Badge>
          </Link>
          <button
            onClick={() => setMenu(!isMenuOpen)}
            className="flex items-center space-x-2"
          >
            <FaUserCircle className="text-4xl" />
          </button>
          {isMenuOpen && <UserMenu onLogout={handleLogout} />}
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

const UserMenu = ({ onLogout }) => (
  <div className="absolute top-10 right-0 mt-2 w-48 bg-slate-900 rounded-md shadow-lg py-1 text-gray-100">
    <MenuItem to="/mentor/profile">Your Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
    <MenuItem onClick={onLogout}>Sign out</MenuItem>
  </div>
);

const MenuItem = ({ children, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2 text-sm hover:bg-gray-600 transition-colors"
  >
    {children}
  </Link>
);

export default MentorNavbar;
