import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone } from "react-icons/fa";
import { FaStop } from "react-icons/fa";

const SpeechRecognition = ({ onSpeechRecognized }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');

      if (event.results[0].isFinal) {
        onSpeechRecognized(transcript);
      }
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, onSpeechRecognized]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsListening(!isListening)}
      className={`w-full py-3 rounded-lg font-semibold shadow-md flex items-center justify-center ${
        isListening ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
      }`}
    >
      {isListening ? (
        <>
          <FaStop className="w-6 h-6 mr-2" />
          Stop Listening
        </>
      ) : (
        <>
          <FaMicrophone className="w-6 h-6 mr-2" />
          Start Listening
        </>
      )}
    </motion.button>
  );
};

export default SpeechRecognition;