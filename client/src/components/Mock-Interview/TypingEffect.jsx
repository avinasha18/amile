import React, { useEffect, useState } from 'react';

const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 50); // Typing speed (adjust as needed)
    return () => clearInterval(interval);
  }, [text]);

  return <p>{displayedText}</p>;
};

export default TypingEffect;
