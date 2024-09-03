import React, { useState, useEffect, useRef } from 'react';
import MessageInput from '../ChatInput';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Avatar, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

function ChatWindow({ activeChat, sendMessage, onBack }) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    if (activeChat) {
      setMessages(activeChat.messages);
    }
  }, [activeChat]);

  useEffect(() => {
    const handleScroll = () => {
      if (messagesEndRef.current) {
        setShowScrollUp(
          messagesEndRef.current.scrollTop <
          messagesEndRef.current.scrollHeight - messagesEndRef.current.clientHeight
        );
      }
    };

    const scrollContainer = messagesEndRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); 
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message) => {
    sendMessage(message);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  if (!activeChat) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <h1 className="text-xl text-gray-500">Select a chat to start messaging</h1>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="p-4 border-b flex items-center justify-between">
        <IconButton onClick={onBack} className="mr-4">
          <ArrowBackIcon style={{ color: isDarkMode ? '#fff' : '#000' }} />
        </IconButton>
        <div className="flex items-center">
          {mentorData && mentorData.profilePic ? (
            <img src={mentorData.profilePic} alt={mentorData.name} className="w-8 h-8 rounded-full mr-2" />
          ) : (
            <Avatar className="mr-2">{mentorData ? mentorData.name.charAt(0).toUpperCase() : ''}</Avatar>
          )}
          <h2 className="text-xl font-semibold">{activeChat?.companyId?.companyName}</h2>
        </div>
      </div>
      <div
        className="flex-grow overflow-y-auto p-4 no-scrollbar"
        ref={messagesEndRef}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.sender === activeChat.studentId._id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`inline-block p-2 rounded-lg ${msg.sender ===activeChat.studentId._id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {msg.text}
              <div className="text-xs mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t">
        <MessageInput sendMessage={handleSendMessage} />
      </div>
      {showScrollUp && (
        <IconButton
          onClick={scrollToBottom}
          sx={{
            position: 'fixed',
            bottom: '120px',
            right: '20px',
            backgroundColor: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
            '&:hover': {
              backgroundColor: isDarkMode ? '#444' : '#f0f0f0',
            },
          }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      )}
    </div>
  );
}

export default ChatWindow;
