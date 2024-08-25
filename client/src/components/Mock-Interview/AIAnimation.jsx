import React from 'react';
import { motion } from 'framer-motion';

const AIAnimation = ({ greeting }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-4"
      >
        {greeting}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl"
      >
        AI Interviewer initializing...
      </motion.p>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
        className="mt-8 w-16 h-16 border-4 border-white border-t-transparent rounded-full"
      />
    </div>
  );
};

export default AIAnimation;