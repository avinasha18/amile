import React, { useState } from 'react';
import MessageInput from '../ChatInput';

function ChatWindow({ activeChat, sendMessage }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Thank you for applying for the UI/UX Design internship! We were impressed with your application and would like to invite you to complete a design task.", sender: 'them' },
    { id: 2, text: "Task Link: https://drive.google.com/file/d/1KBoKQcVlQdlix5jBbRXbn1IKk6h-txOK/view?usp=drive_link", sender: 'them' },
    { id: 3, text: "Deadline: 26th August 2024", sender: 'them' },
    { id: 4, text: "Submission Link: https://forms.gle/6EUYPtDAZLsxvyqN8", sender: 'them' },
    { id: 5, text: "Feel free to reach out if you have any questions. We're excited to see your work!", sender: 'them' },
  ]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { id: messages.length + 1, text: message, sender: 'me' }]);
    sendMessage(message);
  };

  if (!activeChat) {
    return (
      <div className="flex-grow bg-[#000] flex items-center justify-center w-[900px]">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#000] h-full relative  w-[900px]">
         <div className="p-4 border-b border-gray-600 flex items-center">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
          {activeChat.name[0]}
        </div>
        <div>
          <h2 className="font-semibold">{activeChat.name}</h2>
          <p className="text-sm text-gray-600">{activeChat.company} | Applied for UI/UX Designer Internship</p>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map(message => (
          <div key={message.id} className={`mb-4 ${message.sender === 'me' ? 'text-right' : ''}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-[#272727]'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-[80px] left-0 w-full  p-6 bg-[#000]">
        <MessageInput sendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatWindow;
