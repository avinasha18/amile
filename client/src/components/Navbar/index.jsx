import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/redux/AuthSlice";
import { Button } from "@mui/material";
import "./index.css";
import { setAuthToken } from "../../hooks/golbalAuth";

const Navbar = ({ isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setMenu] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const handleLogout = () => {
    dispatch(logout());
    setAuthToken()
    navigate("/login");
  };

  const handleNavigation = (path) => {
    return navigate(path);
  };

  const handleMenuToggle = () => {
    setMenu(!isMenuOpen);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".user-menu")) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <header
      className={`${
        isDarkMode ? "bg-black text-gray-100" : "bg-white text-gray-800"
      } shadow-md z-50 px-5 h-[70px] border-b ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-[30px] font-bold animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          <Link to='/'>
            Amile
          </Link>
        </h1>
        <nav className="hidden md:flex space-x-6">
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/">Jobs</NavItem>
          <NavItem to="/messages">Messages</NavItem>
          <NavItem to="/courses">Courses</NavItem>
        </nav>

        <div className="flex items-center space-x-4">
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
          {isLogin ? (
            <div className="relative user-menu">
              <button
                onClick={handleMenuToggle}
                className="flex items-center space-x-2"
                aria-label="Account Menu"
              >
                <FaUserCircle className="text-2xl" />
                <span className="hidden md:inline">Account</span>
              </button>
              {isMenuOpen && (
                <UserMenu onLogout={handleLogout} isDarkMode={isDarkMode} />
              )}
            </div>
          ) : (
            <div className="flex gap-5">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleNavigation("/signup")}
              >
                Signup
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ children, to }) => (
  <Link to={to} className="hover:text-blue-400 transition-colors">
    {children}
  </Link>
);

const UserMenu = ({ onLogout, isDarkMode }) => (
  <div
    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
      isDarkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-800"
    }`}
  >
    <MenuItem to="/profile">Your Profile</MenuItem>
    <MenuItem to="/settings">Settings</MenuItem>
    <MenuItem to="/myreferals">My Referals</MenuItem>
    <MenuItem onClick={onLogout}>Sign out</MenuItem>
  </div>
);

const MenuItem = ({ children, to, onClick }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sm hover:bg-gray-600 transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
