import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' +
           date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

function ChatList({ chats, setActiveChat, activeChat }) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const nav =useNavigate()
  const sortedChats = [...chats].sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];
    
    const timestampA = lastMessageA ? new Date(lastMessageA.timestamp).getTime() : 0;
    const timestampB = lastMessageB ? new Date(lastMessageB.timestamp).getTime() : 0;
    
    return timestampB - timestampA; 
  });

  if (sortedChats.length === 0) {
    return (
      <h1 className={`text-center p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>No chats</h1>
    );
  }

  return (
    <div className={`h-full overflow-y-auto ${isDarkMode ? 'bg-black border-r border-gray-700 text-white' : 'bg-white border-r border-gray-300 text-black'}`}>
      <h2 className="text-2xl font-bold p-4">Messages</h2>
      <ul>
        {sortedChats.map((chat) => (
          <li
            key={chat._id}
            className={`p-4 cursor-pointer ${activeChat && activeChat._id === chat._id ? isDarkMode ? 'bg-gray-700' : 'bg-blue-200' : 'hover:bg-blue-400'}`}
            onClick={() => setActiveChat(chat)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{chat.studentId?.username}</h3>
              <span className="text-sm">
                {chat.messages.length > 0 ? formatTimestamp(chat.messages[chat.messages.length - 1]?.timestamp) : "start"}
              </span>
            </div>
            <p className="text-sm truncate">
              {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1]?.text : "No messages yet"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
