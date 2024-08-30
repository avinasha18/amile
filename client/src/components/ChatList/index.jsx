import React from 'react';
import { useTheme } from '../../context/ThemeContext';

function ChatList({ chats, setActiveChat, activeChat }) {
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
            className={`p-4 cursor-pointer ${activeChat && activeChat._id === chat._id ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveChat(chat)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{chat.companyId}</h3>
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
