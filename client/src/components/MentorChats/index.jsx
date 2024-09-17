import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatList from './MentorChatList';
import ChatWindow from '../ChatWindow';
import { useTheme } from '../../context/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

function MentorChats() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const userType = 'student';
  const userId = Cookies.get('userId');
  const [mentorData, setMentorData] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${api}/mentor/${userType}/${userId}`);
        setChats(response.data);

        if (activeChat) {
          const updatedActiveChat = response.data.find(chat => chat._id === activeChat._id);
          if (updatedActiveChat) {
            setActiveChat(updatedActiveChat);
          }
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();

    const pollingInterval = setInterval(fetchChats, 1000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [userId, userType]);


  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axios.post('${api}/mentordata', {
          username: 'avinasha'
        });
        setMentorData(response.data.data);
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      }
    };

    fetchMentorData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sendMessage = (message) => {
    if (activeChat) {
      axios
        .post('${api}/mentor/send', {
          mentorId: activeChat.mentorId,
          studentId: activeChat.studentId,
          text: message,
          sender: userType,
        })
        .then((response) => {
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat._id === response.data._id ? response.data : chat
            )
          );
          setActiveChat(response.data); // Update the active chat with the new message
        })
        .catch((error) => console.error('Error sending message:', error));
    }
  };

  return (
    <div className={`flex h-screen w-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {!activeChat || !isMobile ? (
        <div className={`flex-none h-full ${isMobile ? 'w-full' : 'w-2/6'} border-r`}>
          <ChatList chats={chats} setActiveChat={setActiveChat} activeChat={activeChat} mentorData={mentorData} />
          </div>
      ) : null}
      {(activeChat || !isMobile) && (
        <div className={`flex-grow h-full ${isMobile ? 'w-full' : 'w-4/6'}`}>
          <ChatWindow activeChat={activeChat} sendMessage={sendMessage} onBack={() => setActiveChat(null)} mentorData={mentorData} />
          </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default MentorChats;
