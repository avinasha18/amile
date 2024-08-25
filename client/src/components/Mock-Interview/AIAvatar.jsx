import React from 'react';
import { motion } from 'framer-motion';

const AIAvatar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-200 rounded-lg overflow-hidden shadow-md"
    >
      <img
        src="../../assets/195.jpg"
        alt="AI Interviewer"
        className="w-full h-64 object-cover"
      />
      <div className="p-4 bg-white">
        <h2 className="text-xl font-semibold text-gray-800">AI Interviewer</h2>
        <p className="text-sm text-gray-600">Here to assist you</p>
      </div>
    </motion.div>
  );
};

export default AIAvatar;