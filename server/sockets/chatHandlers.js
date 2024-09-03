import { Chat } from "../models/chat.model.js";

const chatHandlers = (io, socket,userSocketMap) => {
  // Store a mapping between user IDs (either companyId or studentId) and socket IDs


  // Join the chat and store the mapping
  socket.on('joinChat', ({ userId }) => {
    userSocketMap[userId] = socket.id;
    console.log(userSocketMap)
    console.log(`User with ID ${userId} joined with Socket ID: ${socket.id}`);
  });

  socket.on('startChat', async ({ companyId, studentId }, callback) => {
    try {
      let chat = await Chat.findOne({ companyId, studentId });

      if (!chat) {
        chat = new Chat({ companyId, studentId, messages: [] });
        await chat.save();
      }

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
      }).populate('companyId studentId', 'name companyName username'); 

      if (chat) {
        message.timestamp = new Date();
        chat.messages.push(message);
        await chat.save();
 
        const recipientId = message.sender === message.studentId ? message.companyId : message.studentId;
        const recipientSocketId = userSocketMap[recipientId];
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('receiveMessage', { chat, message });
          callback({ success: true, chat, message });
        } else {
          callback({ success: true, message: 'Recipient is not online.',chat, message });
        }
      } else {
        callback({ success: false, error: 'Chat not found.' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      callback({ success: false, error: 'Failed to send message.' });
    }
  });

  socket.on('getChats', async ({ message, page = 1, limit = 30 }, callback) => {
    try {
      const skip = (page - 1) * limit;
      
      let chats;
      
      // Fetch chats based on provided criteria
      if (message.companyId && message.studentId) {
        chats = await Chat.findOne({
          companyId: message.companyId,
          studentId: message.studentId,
        }).populate('companyId studentId', 'name companyName username'); 
      } else if (message.companyId) {
        chats = await Chat.find({ companyId: message.companyId })
          .populate('companyId studentId', 'name companyName username'); 
      } else if (message.studentId) {
        chats = await Chat.find({ studentId: message.studentId })
          .populate('companyId studentId', 'name companyName username'); 
      }
      
      if (chats) {
        if (message.companyId && message.studentId) {
          const totalMessages = chats.messages.length;
          const totalPages = Math.ceil(totalMessages / limit);
          const paginatedMessages = chats.messages.reverse().slice(skip, skip + limit).reverse();
  
          callback({
            success: true,
            chat: { ...chats.toObject(), messages: paginatedMessages },
            page,
            limit,
            totalPages,
            totalMessages,
          });
        } else {
          // Handle multiple chats
          const updatedChats = chats.map(chat => {
            const totalMessages = chat.messages.length;
            const totalPages = Math.ceil(totalMessages / limit);
            const paginatedMessages = chat.messages.reverse().slice(skip, skip + limit).reverse();
  
            return {
              ...chat.toObject(),
              messages: paginatedMessages,
              totalPages,
              totalMessages,
            };
          });
  
          callback({ success: true, chats: updatedChats });
        }
      } else {
        callback({ success: false, error: 'Chats not found.' });
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      callback({ success: false, error: 'Failed to fetch chats.' });
    }
  });
  

  socket.on('disconnect', () => {
    // Remove the user from the userSocketMap when they disconnect
    for (const [userId, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[userId];
        console.log(`User with ID ${userId} disconnected.`);
        break;
      }
    }
  });
};

export default chatHandlers;
