// components/AudioOutput.js
import React, { useEffect } from 'react';

const AudioOutput = ({ text }) => {
  useEffect(() => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }, [text]);

  return null;
};

export default AudioOutput;