import React, { useState, useEffect, useRef } from 'react';
import MessageInput from '../ChatInput';
import { useTheme } from '../../context/ThemeContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, IconButton } from '@mui/material';

function ChatWindow({ activeChat, sendMessage, onBack }) {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeChat) {
      setMessages(activeChat.messages);
    }
  }, [activeChat]);


  const handleSendMessage = (message) => {
    sendMessage(message);
  };

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="p-4 border-b flex items-center justify-between">
        <IconButton onClick={onBack} className="mr-4">
          <ArrowBackIcon style={{ color: isDarkMode ? '#fff' : '#000' }} />
        </IconButton>
        <div className="flex items-center">
          {activeChat?.companyLogo && (
            <Avatar src={activeChat.companyLogo} alt="Company Logo" className="mr-2" />
          )}
          <h2 className="text-xl font-semibold">{activeChat?.companyId}</h2>
        </div>
      </div>
      {/* Scrollable area for messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.sender === 'student' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.sender === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      {/* Fixed input area at the bottom */}
      <div className="p-2 border-t">
        <MessageInput sendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatWindow;
