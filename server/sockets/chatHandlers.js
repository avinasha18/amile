import { Chat } from "../models/chat.model.js";

const chatHandlers = (io, socket) => {
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('startChat', async ({ companyId, studentId }, callback) => {
    try {
      let chat = await Chat.findOne({ companyId, studentId });

      if (!chat) {
        chat = new Chat({ companyId, studentId, messages: [] });
        await chat.save();
      }

      const room = `${companyId}-${studentId}`;
      socket.join(room);
      callback({ success: true, chat });
    } catch (error) {
      console.error('Error starting chat:', error);
      callback({ success: false, error: 'Failed to start chat.' });
    }
  });

  // Handle sending a message
  socket.on('sendMessage', async ({ message }, callback) => {
    try {
      const chat = await Chat.findOne({
        companyId: message.companyId,
        studentId: message.studentId,
      });

      if (chat) {
        chat.messages.push(message);
        await chat.save();

        const room = `${message.companyId}-${message.studentId}`;
        io.to(room).emit('receiveMessage', { chat, message });

        callback({ success: true, chat, message });
      } else {
        callback({ success: false, error: 'Chat not found.' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      callback({ success: false, error: 'Failed to send message.' });
    }
  });
};

export default chatHandlers;
