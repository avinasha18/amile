import { Server } from 'socket.io';
import chatHandlers from './chatHandlers.js';
// import userHandlers from './userHandlers.js';

const initializeSocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    chatHandlers(io, socket);

    // userHandlers(io, socket);


    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

export default initializeSocket;
