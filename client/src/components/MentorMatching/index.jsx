import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, CardContent, Typography, Avatar, Switch } from '@mui/material';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import animationData1 from './animation.json';
import animationData2 from './animation2.json';
import animationData3 from './animation3.json';

const MentorMatching = () => {
  const [openModal, setOpenModal] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(1);
  const [mentorMatched, setMentorMatched] = useState(false);
  const [mentor, setMentor] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      if (currentAnimation === 1) {
        setTimeout(() => setCurrentAnimation(2), 5000);
      } else if (currentAnimation === 2) {
        setTimeout(() => setCurrentAnimation(3), 4000);
      } else if (currentAnimation === 3) {
        setTimeout(() => {
          setMentor({
            name: "John Doe",
            skills: ["JavaScript", "React", "Node.js"],
            expertise: "Full Stack Development",
            experience: "5 years",
            avatar: "https://i.pravatar.cc/300"
          });
          setMentorMatched(true);
        }, 2000);
      }
    }
  }, [startAnimation, currentAnimation]);

  const handleAssignMentor = () => {
    setOpenModal(false);
    setStartAnimation(true);
  };

  const handleChooseMentor = () => {
    alert('Mentorship successfully assigned!');
  };

  const handleTryAnother = () => {
    setMentor(null);
    setMentorMatched(false);
    setCurrentAnimation(1);
    setStartAnimation(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const animationOptions = (data) => ({
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  });

  return (
    <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} min-h-screen flex justify-center items-center transition-colors duration-500 w-full`}>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="flex justify-center items-center"
      >
        <Card className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-8 rounded-lg shadow-xl transition-colors duration-500`}>
          <Typography variant="h5" className="text-center mb-4">
            Do you need a personalized mentor based on your profile?
          </Typography>
          <div className="flex justify-center mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAssignMentor}
              className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-lg shadow-md"
            >
              Assign a Mentor for Me
            </Button>
          </div>
        </Card>
      </Modal>

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <Switch checked={isDarkMode} onChange={toggleDarkMode} />
        <Typography variant="body2" className="ml-2 inline text-sm">
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Typography>
      </div>

      {/* Conditional rendering for animations and mentor card */}
      {startAnimation && currentAnimation === 1 && (
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Lottie options={animationOptions(animationData1)} height={330} width={330} />
          <Typography
            variant="h6"
            className="mt-4 text-center text-xl font-semibold"
            style={{ color: isDarkMode ? 'white' : 'black' }}
          >
            AI is assigning the best mentor for you...
          </Typography>
        </motion.div>
      )}

      {startAnimation && currentAnimation === 2 && (
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Lottie options={animationOptions(animationData2)} height={330} width={330} />
          <Typography
            variant="h6"
            className="mt-4 text-center text-xl font-semibold"
            style={{ color: isDarkMode ? 'white' : 'black' }}
          >
            Analyzing your profile data...
          </Typography>
        </motion.div>
      )}

      {startAnimation && currentAnimation === 3 && !mentorMatched && (
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Lottie options={animationOptions(animationData3)} height={330} width={330} />
          <Typography
            variant="h6"
            className="mt-4 text-center text-xl font-semibold"
            style={{ color: isDarkMode ? 'white' : 'black' }}
          >
            Finalizing the best match...
          </Typography>
        </motion.div>
      )}

      {mentorMatched && mentor && (
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Card className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} max-w-sm w-full shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300`}>
            <div className="flex justify-center mt-4">
              <Avatar
                src={mentor.avatar}
                alt={mentor.name}
                className="w-28 h-28 shadow-lg"
              />
            </div>
            <CardContent>
              <Typography variant="h5" className="text-center font-bold mb-2">
                {mentor.name}
              </Typography>
              <Typography variant="body1" className="text-center mb-2">
                Skills: {mentor.skills.join(', ')}
              </Typography>
              <Typography variant="body1" className="text-center mb-2">
                Expertise: {mentor.expertise}
              </Typography>
              <Typography variant="body1" className="text-center mb-4">
                Experience: {mentor.experience}
              </Typography>
              <div className="flex justify-around mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleChooseMentor}
                  className="flex items-center bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded-lg shadow-md"
                >
                  <AiOutlineCheckCircle className="mr-2" />
                  Choose Mentor
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleTryAnother}
                  className="text-red-600 border-red-600 hover:bg-red-50 px-6 py-2 rounded-lg"
                >
                  Try Another
                </Button>
              </div>
            </CardContent>
          </Card>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => window.location.href = '/chat'}
              className="bg-indigo-600 hover:bg-indigo-800 text-white px-8 py-3 rounded-lg shadow-md"
            >
              Chat with Mentor
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MentorMatching;
