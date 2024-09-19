import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { Button, IconButton, Skeleton, Typography } from '@mui/material';
import { FaStop, FaMicrophone } from 'react-icons/fa';
import animationData from './animations/animation.json';
import aiImage from '../../assets/195.jpg';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';

const flask_domain = 'http://127.0.0.1:8080';

function InterviewApp() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [gotQuestion, setGotQuestion] = useState(false);
  const [gotResponse, setGotResponse] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [recordingState, setRecordingState] = useState('idle');
  const videoRef = useRef(null);
  const username = Cookies.get('user');
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');

  // Typing effect variables
  let typingIndex = 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      fetchFirstQuestion();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showAnimation) {
      startVideoStream();
    }
  }, [showAnimation]);

  const typeText = (text, callback) => {
    typingIndex = 0;
    setDisplayText('');
    const typingInterval = setInterval(() => {
      if (typingIndex < text.length) {
        setDisplayText((prev) => prev + text[typingIndex]);
        typingIndex++;
      } else {
        clearInterval(typingInterval);
        if (callback) callback(); // Callback after typing is complete
      }
    }, 50); // Adjust the typing speed here (50ms per letter)
  };

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsVideo(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('An error occurred while trying to access the camera.');
    }
  };

  const stopVideoStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsVideo(false);
    }
  };

  const toggleVideoStream = () => {
    if (isVideo) {
      stopVideoStream();
    } else {
      startVideoStream();
    }
  };

  const fetchFirstQuestion = async () => {
    try {
      setRecordingState('processing');
      const res = await axios.get(`${flask_domain}/ask-question?username=${username}`);
      setQuestion(res.data.question);
      setGotQuestion(true);
      typeText(res.data.question, () => setRecordingState('idle')); // Apply typing effect to the first question and then idle state
    } catch (err) {
      console.error(err);
      setRecordingState('idle');
    }
  };

  const handleRecord = async () => {
    setRecordingState('processing');
    setIsRecording(true);
    try {
      const res = await axios.post(`${flask_domain}/transcribe`, {
        duration: 10,
        sample_rate: 16000,
        question: question,
        conversationHistory: conversationHistory,
        username: username,
      });

      if (res.data.response) {
        const newResponse = res.data.audio;
        setResponse(newResponse);
        setGotResponse(true);
        typeText(res.data.response, () => setRecordingState('idle')); // Apply typing effect to the response and then idle state

        const newHistory = [
          ...conversationHistory,
          { question: question, response: newResponse },
        ];
        setConversationHistory(newHistory);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRecording(false);
    }
  };

  const handleEnd = async () => {
    try {
      const res = await axios.post(`${flask_domain}/feedback`, {
        conversation_history: conversationHistory,
      });
      const feedbackScore = res.data;
      navigate('/feedback', { state: { score: feedbackScore } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-y-auto no-scrollbar bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-20 p-2">
      {showAnimation ? (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
            }}
            height={400}
            width={400}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-200 rounded-lg overflow-hidden shadow-md"
              >
                <img src={aiImage} alt="AI" className="w-full h-64 object-cover rounded-lg" />
                <div className="p-4 bg-white">
                  <h2 className="text-xl font-semibold text-gray-800">AI</h2>
                  <p className="text-sm text-gray-600">Interviewer</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-200 rounded-lg overflow-hidden shadow-md p-4"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Question</h2>
                {gotQuestion ? (
                  <Typography variant="body1" className="text-gray-700">
                    {displayText}
                  </Typography>
                ) : (
                  <Skeleton animation="wave" height={60} />
                )}
              </motion.div>
            </div>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-200 rounded-lg overflow-hidden shadow-md"
              >
                <video ref={videoRef} autoPlay muted className="w-full h-64 object-cover" />
                <div className="flex justify-between bg-white">
                  <div className="p-4 bg-white">
                    <h2 className="text-xl font-semibold text-gray-800">You</h2>
                    <p className="text-sm text-gray-600">Candidate</p>
                  </div>
                  <div className="p-4 bg-white">
                    <IconButton onClick={toggleVideoStream}>
                      {isVideo ? <VideocamOffIcon /> : <VideocamIcon />}
                    </IconButton>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-200 rounded-lg overflow-hidden shadow-md p-4"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Response</h2>
                {gotResponse ? (
                  <Typography variant="body1" className="text-gray-700">
                    {response}
                  </Typography>
                ) : (
                  <Skeleton animation="wave" height={60} />
                )}
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full flex justify-between px-6 py-4 bg-gray-100"
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={isRecording ? <FaStop /> : <FaMicrophone />}
              onClick={isRecording ? handleEnd : handleRecord}
              disabled={recordingState !== 'idle'} // Disabled if AI is speaking or during processing
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleEnd}
              disabled={recordingState === 'processing'} // Disable while processing
            >
              End Interview
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default InterviewApp;
