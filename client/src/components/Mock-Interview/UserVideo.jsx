import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const UserVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(error => console.error("Error accessing the camera:", error));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-200 rounded-lg overflow-hidden shadow-md"
    >
      <video ref={videoRef} autoPlay muted className="w-full h-64 object-cover" />
      <div className="p-4 bg-white">
        <h2 className="text-xl font-semibold text-gray-800">You</h2>
        <p className="text-sm text-gray-600">Candidate</p>
      </div>
    </motion.div>
  );
};

export default UserVideo;