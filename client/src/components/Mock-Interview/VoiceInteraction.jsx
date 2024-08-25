import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';

const VoiceInteraction = ({ onUserSpeak }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  useEffect(() => {
    if (transcript && isListening) {
      onUserSpeak(transcript);
      resetTranscript();
    }
  }, [transcript, isListening, onUserSpeak, resetTranscript]);

  const handleVoiceCommand = () => {
    const message = new SpeechSynthesisUtterance('Hello! I am your AI Interviewer.');
    window.speechSynthesis.speak(message);
  };

  useEffect(() => {
    setTimeout(() => {
      handleVoiceCommand();
    }, 2000); // Introduces AI after 2 seconds
  }, []);

  return (
    <div className="text-center mt-4">
      <button
        onClick={() => {
          setIsListening(!isListening);
        }}
        className={`px-4 py-2 rounded-lg ${isListening ? 'bg-red-500' : 'bg-green-500'} text-white`}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
};

export default VoiceInteraction;
