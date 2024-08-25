// src/components/MessageInput.js
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

function MessageInput({ sendMessage }) {
  const [message, setMessage] = useState('');
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-0 w-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className={`flex-grow p-2 border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'} rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
