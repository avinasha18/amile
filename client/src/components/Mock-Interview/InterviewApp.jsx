import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { Button, IconButton, Skeleton, Typography } from '@mui/material';
import { FaStop } from "react-icons/fa";
import { FaMicrophone } from 'react-icons/fa';
import animationData from './animations/animation.json';
import aiImage from '../../assets/195.jpg'; 
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
const flask_domain = 'http://127.0.0.1:5000';

function InterviewApp() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [gotQuestion, setGotQuestion] = useState(false);
  const [gotResponse, setGotResponse] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isvideo, setIsVideo] = useState(false);
  const videoRef = useRef(null);
  const username = Cookies.get('user')
  const navigate = useNavigate();
  

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

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsVideo(true);
      }
    } catch (error) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        try {
          await navigator.permissions.query({ name: 'camera' });
          // Request camera permissions again
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsVideo(true);
          }
        } catch (err) {
          alert('Camera access has been denied. Please allow camera permissions in your browser settings.');
        }
      } else {
        console.error('Error accessing camera:', error);
        alert('An error occurred while trying to access the camera. Please try again.');
      }
    }
  };
  
  const stopVideoStream = async () => {
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
  
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
  
        setIsVideo(false);
      }
    } catch (error) {
      console.error('Error stopping video stream:', error);
    }
  };
  
  
   const toggleVideoStream = async () => {

    if(isvideo){
      stopVideoStream()
    }else{
      startVideoStream()
    }

   }

  const fetchFirstQuestion = async () => {
    try {
      const res = await axios.get(`${flask_domain}/ask-question?username=${username}`);
      setQuestion(res.data.question);
      setGotQuestion(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecord = async () => {
    setIsRecording(true);
    try {
      const res = await axios.post(`${flask_domain}/transcribe`, {
        duration: 10,
        sample_rate: 16000,
        question: question,
        conversationHistory: conversationHistory,
        username: username
      });

      if (res.data.response) {
        const newResponse = res.data.audio;
        setResponse(newResponse);
        setGotResponse(true);

        const newHistory = [
          ...conversationHistory,
          { question: question, response: newResponse },
        ];
        setConversationHistory(newHistory);
        setQuestion(res.data.response);

        // Simulate typing effect
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Adjust the duration as needed
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
      setIsRecording(false);
      navigate('/feedback', { state: { score: feedbackScore } });
    } catch (err) {
      console.error(err);
    }
  };

  if (showAnimation) {
    return (
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
    );
  }

  return (
    <div className="min-h-screen w-screen overflow-y-auto no-scrollbar bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-20 p-2">
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
                <p className="text-gray-700">{question}</p>
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
              <div className='flex justify-between bg-white'>

             
              <div className="p-4 bg-white">
                <h2 className="text-xl font-semibold text-gray-800">You</h2>
                <p className="text-sm text-gray-600">Candidate</p>
              </div>
              <div className="p-4 bg-white">
                <IconButton onClick={toggleVideoStream}>{isvideo?<VideocamOffIcon/> :<VideocamIcon/>}</IconButton>
              </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-md p-4"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Response</h2>
              {gotResponse ? (
                <Typography variant="body1" className="text-gray-700">
                  {isTyping ? "Typing..." : response}
                </Typography>
              ) : (
                <Skeleton animation="wave" height={60} />
              )}
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRecord}
              disabled={isRecording}
              className={`w-full py-3 rounded-lg font-semibold shadow-md flex items-center justify-center ${
                isRecording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
              }`}
            >
              {isRecording ? (
                <>
                  <FaStop className="w-6 h-6 mr-2" />
                  Recording...
                </>
              ) : (
                <>
                  <FaMicrophone className="w-6 h-6 mr-2" />
                  Record Answer
                </>
              )}
            </motion.button>
          </div>
        </div>
        <div className="p-6 flex justify-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEnd}
            className="mt-4"
          >
            End Interview
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default InterviewApp;
