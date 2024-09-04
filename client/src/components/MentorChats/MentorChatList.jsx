import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Avatar } from '@mui/material';

function ChatList({ chats, setActiveChat, activeChat,companyDetails, mentorData }) {
  const { isDarkMode } = useTheme();

  if (chats.length === 0) {
    return (
      <h1 className={`text-center p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>No chats</h1>
    );
  }

  return (
    <div className={`h-full overflow-y-auto ${isDarkMode ? 'bg-black border-r border-gray-700 text-white' : 'bg-white border-r border-gray-300 text-black'}`}>
      <h2 className="text-2xl font-bold p-4">Messages</h2>
      <ul>
        {chats.map(chat => (
          <li
            key={chat._id}
            className={`p-4 cursor-pointer ${activeChat && activeChat._id === chat._id ? isDarkMode ? 'bg-gray-700' : 'bg-blue-200' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveChat(chat)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {mentorData && mentorData.profilePic ? (
                  <img src={ mentorData.profilepicUrl} alt={mentorData.name} className="w-8 h-8 rounded-full mr-2" />
                ) : (
                  <Avatar className="mr-2">{mentorData ? mentorData.name.charAt(0).toUpperCase() : ''}</Avatar>
                )}
                <h3 className="font-semibold">{mentorData ? mentorData.name : 'Unknown Mentor'}</h3>
              </div>
              <span className="text-sm">{new Date(chat.messages[chat.messages.length - 1]?.timestamp).toLocaleString()}</span>
            </div>
            <p className="text-sm truncate">{chat.messages[chat.messages.length - 1]?.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
