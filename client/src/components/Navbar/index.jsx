// components/Navbar.js
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/redux/AuthSlice";
import "./index.css";
import { Button } from "@material-ui/core";

const Navbar = ({ isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleNavigation = (path)=>{
    return navigate(path)
  }
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`${isDarkMode ? 'bg-black text-gray-100' : 'bg-white text-gray-800'} shadow-md z-50 px-5 h-[70px] border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-[30px] font-bold animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Amile
        </h1>
        <nav className="hidden md:flex space-x-6">
          <NavItem to="/">Dashboard</NavItem>
          <NavItem to="/jobs">Jobs</NavItem>
          <NavItem to="/messages">Messages</NavItem>
        </nav>

        {isLogin ? (
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
              {isMenuOpen && <UserMenu onLogout={handleLogout} isDarkMode={isDarkMode} />}
          </div>
        ) : (
          <div className="relative gap-5 flex ">
          <Button variant="outlined" color="primary" onClick={()=>handleNavigation("/signup")}>
              Signup
            </Button>
            <Button variant="outlined" color="secondary" onClick={()=>handleNavigation("/login")}>
              Login
            </Button>
          
            </div>
        </div>
        )}
      </div>
    </header>
  );
};



const NavItem = ({ children, to }) => (
  <Link to={to} className="hover:text-blue-400 transition-colors">
    {children}
  </Link>
);

const UserMenu = ({ onLogout }) => (
  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 text-gray-100">
    <MenuItem to="/profile">Your Profile</MenuItem>
    <MenuItem to="/settings">Settings</MenuItem>
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
