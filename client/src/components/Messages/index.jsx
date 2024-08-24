import React, { useState } from 'react';
import ChatList from '../ChatList';
import ChatWindow from '../ChatWindow';

const initialChats = [
  { id: 1, name: 'Arpit', company: 'ZuPay', message: 'Thank you for applying fo...', time: '11:48 AM', type: 'Internship' },
  { id: 2, name: 'Raghav', company: 'Masters-Connect', message: 'Hi, below is the link to ...', time: '08/21/2024', type: 'Internship' },
  { id: 3, name: 'Shidharth', company: 'Byproduct Ventures L...', message: 'Hey, Thank you for applying...', time: '05/14/2024', type: 'Internship' },
  { id: 4, name: 'Pranita', company: 'Techwondoe', message: 'Dear Candidate, Thank you...', time: '08/13/2024', type: 'Internship' },
  { id: 5, name: 'Priyanka', company: 'Mikado Solutions', message: 'Dear Candidate, Thank you...', time: '09/10/2024', type: 'Job' },
];

function Messages() {
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(null);

  const sendMessage = (message) => {
    if (activeChat) {
      const updatedChats = chats.map(chat => 
        chat.id === activeChat.id 
          ? { ...chat, message: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          : chat
      );
      setChats(updatedChats);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatList chats={chats} setActiveChat={setActiveChat} activeChat={activeChat} />
      <ChatWindow activeChat={activeChat} sendMessage={sendMessage} />
    </div>
  );
}

export default Messages;
