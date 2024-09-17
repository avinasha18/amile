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
import courseRoutes from "./routes/courseRoutes.js"
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
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  }
});


const origins = ["http://localhost:5173", "http://localhost:5174","http://localhost:5175", "https://amile-spey.vercel.app","https://amile-qxg8.vercel.app/","https://amile-company.vercel.app/" ]
app.use(cors({
  origin: origins,
  methods: ["GET", "POST","DELETE","PUT"],

}));



app.use(express.json());
app.use(bodyParser.json());
app.use("/", userRoutes);
app.use("/mentor", mentorRoutes);
app.use("/companies", companyRoutes);
app.use("/", internshipRoutes);
app.use("/", referalRoutes);
app.use("/", courseRoutes);
app.use('/', applicationRoutes);
app.use('/', dashboardRoutes);
app.use('/', chatRoutes(io));

const userSocketMap = {}
connectToMongoDB();
initializeSocket(io, userSocketMap);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
