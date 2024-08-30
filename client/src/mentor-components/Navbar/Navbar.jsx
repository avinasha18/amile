import React, { useState } from 'react';
import { MdMenuOpen, MdOutlineLightMode, MdDarkMode, MdOutlineMenu } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { IoShieldHalfSharp } from "react-icons/io5";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';

const MentorNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  return (
    <header className="fixed w-full h-16 bg-white shadow z-10 flex items-center justify-between px-4">
      {/* Logo and Search */}
      <div className="flex items-center">
        <span className="text-2xl font-bold text-gray-800">Amile</span>
        <button className="ml-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <MdMenuOpen className="text-gray-800 text-lg" />
        </button>
        <div className="ml-4 bg-gray-100 rounded flex items-center px-3 py-1">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-gray-800 ml-2"
          />
          <MdOutlineMenu className="text-gray-800" />
        </div>
      </div>

      {/* Action Buttons and Account Menu */}
      <div className="flex items-center">
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mr-2">
          <MdOutlineLightMode className="text-gray-800 text-lg" />
        </button>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mr-2">
          <FaRegBell className="text-gray-800 text-lg" />
        </button>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mr-2">
          <AiOutlineMessage className="text-gray-800 text-lg" />
        </button>
        
        {/* Account Dropdown */}
        <div className="flex items-center cursor-pointer" onClick={handleOpenMyAccDrop}>
          <Avatar alt="User" src="https://yt3.ggpht.com/yti/ANjgQV8o4R3r61DocNKC7tWs43p6uEM953AY3eSo1DLhX3M=s88-c-k-c0x00ffffff-no-rj-mo" />
          <div className="ml-2">
            <h4 className="text-sm font-semibold text-gray-800">yogini</h4>
            <p className="text-xs text-gray-600">@yogini</p>
          </div>
        </div>

        {/* Account Menu */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleCloseMyAccDrop}
          onClick={handleCloseMyAccDrop}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleCloseMyAccDrop}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            My account
          </MenuItem>
          <MenuItem onClick={handleCloseMyAccDrop}>
            <ListItemIcon>
              <IoShieldHalfSharp />
            </ListItemIcon>
            Reset Password
          </MenuItem>
          <MenuItem onClick={handleCloseMyAccDrop}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default MentorNavbar;
