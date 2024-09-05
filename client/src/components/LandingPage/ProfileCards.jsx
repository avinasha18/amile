import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const ProfileCards = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const profiles = [
    { id: 1, name: 'John Doe', title: 'ML Engineer', message: 'Believe in yourself!' },
    { id: 3, name: 'Alice Johnson', title: 'Full Stack Developer', message: 'Never give up!' },
    { id: 4, name: 'Bob Brown', title: 'Java Developer', message: 'Keep pushing forward!' },
    { id: 5, name: 'Sai Babu', title: 'Data Scientist', message: 'Work hard!' },
  ];

  const handleClick = (id) => {
    setSelectedProfile(selectedProfile === id ? null : id);
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 p-4">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="relative w-64 h-40 cursor-pointer"
          onClick={() => handleClick(profile.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white text-5xl rounded-lg shadow-lg">
            <FaUserCircle />
          </div>
          {selectedProfile === profile.id && (
            <div className="absolute inset-0 bg-white p-4 shadow-lg rounded-lg">
              <h4 className="text-xl text-center text-gray-800 font-bold">{profile.name}</h4>
              <p className="text-xl text-center text-gray-400">{profile.title}</p>
              <p className="text-center text-gray-600">{profile.message}</p>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileCards;
