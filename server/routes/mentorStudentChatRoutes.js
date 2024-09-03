import express from 'express';
import { getChatsByStudentId, getChatsByMentorId, getChatByMentorAndStudent, sendMessage } from '../controllers/mentorStudentChattingController.js';

const router = express.Router();

export default (io) => {
  router.get('/mentor/student/:studentId', getChatsByStudentId);
  router.get('/mentor/:mentorId', getChatsByMentorId);
  router.get('/mentor/:mentorId/student/:studentId', getChatByMentorAndStudent);
  router.post('/mentor/send', sendMessage(io));

  return router;
};
