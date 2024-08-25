import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { Button, Skeleton } from '@mui/material';
import { FaStop } from "react-icons/fa";
import { FaMicrophone } from 'react-icons/fa';
import animationData from './animations/animation.json'; 

const flask_domain = 'http://localhost:5000'; 

function InterviewApp() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [gotQuestion, setGotQuestion] = useState(false);
  const [gotResponse, setGotResponse] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
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
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const fetchFirstQuestion = async () => {
    try {
      const res = await axios.get(`${flask_domain}/ask-question`);
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

  if (showAnimation) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
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
              <video ref={videoRef} autoPlay muted className="w-full h-64 object-cover" />
              <div className="p-4 bg-white">
                <h2 className="text-xl font-semibold text-gray-800">You</h2>
                <p className="text-sm text-gray-600">Candidate</p>
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
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Response</h2>
              {gotResponse ? (
                <p className="text-gray-700">{response}</p>
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