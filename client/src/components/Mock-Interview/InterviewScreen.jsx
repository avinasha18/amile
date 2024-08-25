import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AIAvatar from './AIAvatar';
import UserVideo from './UserVideo';
import ChatBox from './ChatBox';
import AudioOutput from './AudioOutput';
import SpeechRecognition from './SpeechRecognition';

const InterviewScreen = ({ initialGreeting }) => {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [conversation, setConversation] = useState([]);

  const startInterview = () => {
    setInterviewStarted(true);
    addMessageToConversation(initialGreeting, 'ai');
  };

  const addMessageToConversation = (text, sender) => {
    setConversation(prev => [...prev, { text, sender }]);
  };

  const handleUserInput = (text) => {
    addMessageToConversation(text, 'user');
    setTimeout(() => {
      const aiResponse = "That's an interesting point. Could you elaborate further?";
      addMessageToConversation(aiResponse, 'ai');
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      <div className="space-y-4">
        <AIAvatar />
        <UserVideo />
      </div>
      <div className="space-y-4">
        <ChatBox conversation={conversation} />
        {interviewStarted ? (
          <>
            <AudioOutput text={conversation[conversation.length - 1]?.text} />
            <SpeechRecognition onSpeechRecognized={handleUserInput} />
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startInterview}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md"
          >
            Start Interview
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default InterviewScreen;