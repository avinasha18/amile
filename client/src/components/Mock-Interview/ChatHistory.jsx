import React from 'react';

const ChatHistory = ({ conversation }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-full max-w-2xl">
      {conversation.map((msg, index) => (
        <div key={index} className={`my-2 p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-100 text-left' : 'bg-gray-100 text-right'}`}>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
