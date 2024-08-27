import React, { useState, useEffect, useRef } from 'react';
import MessageInput from '../ChatInput';
import { useTheme } from '../../context/ThemeContext';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Avatar, IconButton } from '@mui/material';

function ChatWindow({ activeChat, sendMessage, onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Thank you for applying for the UI/UX Design internship! We were impressed with your application and would like to invite you to complete a design task.", sender: 'them' },
    { id: 2, text: "Task Link: https://drive.google.com/file/d/1KBoKQcVlQdlix5jBbRXbn1IKk6h-txOK/view?usp=drive_link", sender: 'them' },
    { id: 3, text: "Deadline: 26th August 2024", sender: 'them' },
    { id: 4, text: "Submission Link: https://forms.gle/6EUYPtDAZLsxvyqN8", sender: 'them' },
    { id: 5, text: "Feel free to reach out if you have any questions. We're excited to see your work!", sender: 'them' },
  ]);

  const { isDarkMode } = useTheme();
  const messagesEndRef = useRef(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (messagesEndRef.current) {
        setShowScrollUp(messagesEndRef.current.scrollTop < messagesEndRef.current.scrollHeight - messagesEndRef.current.clientHeight);
      }
    };

    const scrollContainer = messagesEndRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { id: messages.length + 1, text: message, sender: 'me' }]);
    sendMessage(message);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  if (!activeChat) {
    return (
      <div className={`flex-col ${isDarkMode ? 'bg-black' : 'bg-gray-100'} flex h-[100%] items-center justify-center`}>
        <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isDarkMode ? 'bg-black' : 'bg-white'} h-full relative`}>
      <div className="p-4 border-b flex items-center justify-between">
        <div className='flex gap-2'>
          <button className="bg-transparent text-white px-3 p-0 rounded-full" onClick={onBack}>
            <ArrowBack color={isDarkMode ? "primary" : "secondary"} />
          </button>
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
            <Avatar />
          </div>
          <div>
            <h2 className="font-semibold">{activeChat.name}</h2>
            <p className="text-sm text-gray-600">{activeChat.company} | Applied for UI/UX Designer Internship</p>
          </div>
        </div>
      </div>
      <div
        ref={messagesEndRef}
        className="flex-grow overflow-y-auto p-4"
        style={{ marginBottom: '180px' }} 
      >
        {messages.map(message => (
          <div key={message.id} className={`mb-4 ${message.sender === 'me' ? 'text-right' : ''}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-[#dad8d8] text-black'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t fixed bottom-0 w-[100%] flex items-center z-10">
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
