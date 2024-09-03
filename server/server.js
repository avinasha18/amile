import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectToMongoDB } from './db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import chatRoutes from './routes/chattingRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import referalRoutes from "./routes/referalRoutes.js";
import applicationRoutes from './routes/applicaionRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import initializeSocket from './sockets/index.js';
import { VerifyMentorAccountwithToken } from './controllers/mentorController.js';
import mentorStudentChatRoutes from './routes/mentorStudentChatRoutes.js';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
});

// Apply CORS middleware before any routes
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(bodyParser.json());

app.use("/", userRoutes);
app.use("/", mentorRoutes);
app.use("/companies", companyRoutes);
app.use("/", internshipRoutes);
app.use("/", referalRoutes);
app.use('/', applicationRoutes);
app.use('/', dashboardRoutes);
app.use('/', chatRoutes(io));
app.use('/',mentorStudentChatRoutes(io))

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('sendMessage', ({ room, chat, message }) => {
    io.to(room).emit('receiveMessage', { chat, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// initializeSocket(server);
connectToMongoDB();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
