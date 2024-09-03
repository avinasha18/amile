import { Server } from 'socket.io';
import chatHandlers from './chatHandlers.js';
// import userHandlers from './userHandlers.js';

const initializeSocket = (io, userSocketMap) => {

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    chatHandlers(io, socket, userSocketMap);

    // userHandlers(io, socket);


    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

export default initializeSocket;
