import React from 'react';
import { motion } from 'framer-motion';

const ChatBox = ({ conversation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md h-96 overflow-y-auto p-4"
    >
      {conversation.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`mb-4 ${
            message.sender === 'user' ? 'text-right' : 'text-left'
          }`}
        >
          <span
            className={`inline-block px-4 py-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {message.text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ChatBox;