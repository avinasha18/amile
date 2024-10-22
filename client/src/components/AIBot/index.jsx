import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { BsChatDotsFill } from 'react-icons/bs'; 

const AiBot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleBotClick = () => {
    navigate('/yourai');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        whileHover={{ scale: 1.3, rotate: 20, y: -10 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
        onClick={handleBotClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="cursor-pointer flex justify-center items-center w-16 h-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 rounded-full shadow-2xl hover:shadow-lg transition-all duration-300">
          <BsChatDotsFill
            className={`text-white text-4xl ${isHovered ? 'animate-pulse' : ''}`} // Pulse effect on hover
          />
        </div>
      </motion.div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-16 right-0 bg-black text-white text-sm p-3 rounded-lg shadow-lg max-w-lg"
        >
          <p>Hey there! Need help or feedback?</p>
        </motion.div>
      )}
    </div>
  );
};

export default AiBot;
