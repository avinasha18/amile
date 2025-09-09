import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { api, socketApi } from '../../hooks/apis';
const socket = io(`${socketApi}`, {
  transports: ['websocket'],
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
});

function StartChat() {
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const companyId = '66c4a5eb4177e452682f5715'; // Replace with the actual company ID

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      if (chat && data.chat._id === chat._id) {
        setMessages((prevMessages) => [...prevMessages, ...data.chat.messages]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [chat]);

  const handleStartChat = async () => {
    try {
      console.log('in handle');
      const response = await axios.get(`${api}/company/${companyId}/student/${studentId}`);
      setChat(response.data);
      console.log(response, 'res');
      setMessages(response.data.messages);

      // Join the room for real-time updates
      const room = `${companyId}-${studentId}`;
      socket.emit('joinRoom', room);

      console.log('Chat started or retrieved:', response.data);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const newMessage = {
        companyId,
        studentId,
        text: message,
        sender: 'company',
      };

      const response = await axios.post(`${api}/send`, newMessage);
      setMessages(response.data.messages);
      setMessage('');

      // Emit message to the socket server for real-time updates
      socket.emit('sendMessage', {
        room: `${companyId}-${studentId}`,
        chat: response.data,
      });

      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 mb-2 w-full text-black"
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 mb-2 w-full text-black"
      />
      <button
        onClick={handleStartChat}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Start Chat
      </button>
      <button
        onClick={handleSendMessage}
        className="bg-green-500 text-white p-2 rounded ml-2"
      >
        Send Message
      </button>

      <div className="mt-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 mb-2 ${msg.sender === 'company' ? 'text-right' : 'text-left'}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StartChat;
