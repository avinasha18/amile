// src/components/ChatList.js
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

function ChatList({ chats, setActiveChat, activeChat }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`h-full overflow-y-auto ${isDarkMode ? 'bg-black border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className={`text-2xl font-bold p-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Messages</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`p-4 cursor-pointer ${
              activeChat && activeChat.id === chat.id
                ? isDarkMode
                  ? 'bg-gray-700'
                  : 'bg-blue-100'
                : isDarkMode
                ? 'hover:bg-gray-700'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setActiveChat(chat)}
          >
            <div className="flex justify-between items-center">
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{chat.name}</h3>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{chat.time}</span>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{chat.company}</p>
            <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{chat.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
