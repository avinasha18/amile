// src/components/ChatWindow.js
import React, { useState } from 'react';
import MessageInput from '../ChatInput';
import { useTheme } from '../../context/ThemeContext';

function ChatWindow({ activeChat, sendMessage, onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Thank you for applying for the UI/UX Design internship! We were impressed with your application and would like to invite you to complete a design task.", sender: 'them' },
    { id: 2, text: "Task Link: https://drive.google.com/file/d/1KBoKQcVlQdlix5jBbRXbn1IKk6h-txOK/view?usp=drive_link", sender: 'them' },
    { id: 3, text: "Deadline: 26th August 2024", sender: 'them' },
    { id: 4, text: "Submission Link: https://forms.gle/6EUYPtDAZLsxvyqN8", sender: 'them' },
    { id: 5, text: "Feel free to reach out if you have any questions. We're excited to see your work!", sender: 'them' },
  ]);
  const { isDarkMode } = useTheme();

  const handleSendMessage = (message) => {
    setMessages([...messages, { id: messages.length + 1, text: message, sender: 'me' }]);
    sendMessage(message);
  };

  if (!activeChat) {
    return (
      <div className={`flex-grow ${isDarkMode ? 'bg-black' : 'bg-gray-100'} flex items-center justify-center`}>
        <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isDarkMode ? 'bg-black' : 'bg-white'} h-full relative`}>
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
            {activeChat.name[0]}
          </div>
          <div>
            <h2 className="font-semibold">{activeChat.name}</h2>
            <p className="text-sm text-gray-600">{activeChat.company} | Applied for UI/UX Designer Internship</p>
          </div>
        </div>
        <button className="ml-auto bg-blue-500 text-white px-3 py-1 rounded" onClick={onBack}>
          Back
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map(message => (
          <div key={message.id} className={`mb-4 ${message.sender === 'me' ? 'text-right' : ''}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-[#dad8d8] text-black'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t fixed bottom-1 w-[850px] flex items-center justify-center">
        <MessageInput sendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatWindow;
