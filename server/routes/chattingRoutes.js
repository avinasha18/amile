import express from 'express';
import { Chat } from '../models/chat.model.js';
import mongoose from 'mongoose';
const router = express.Router();

export default (io) => {
  router.get('/student/:studentId', async (req, res) => {
    try {
      const studentId = req.params.studentId;
  
      const chatsWithCompanyDetails = await Chat.aggregate([
        {
          $match: { studentId: new mongoose.Types.ObjectId(studentId) }
        },
        {
          $lookup: {
            from: 'companies', // The name of the Company collection in MongoDB (pluralized by default)
            localField: 'companyId',
            foreignField: '_id',
            as: 'companyDetails'
          }
        },
        {
          $unwind: '$companyDetails' // Deconstructs the array to objects (if needed)
        },
        {
          $project: {
            _id: 1,
            companyId: 1,
            studentId: 1,
            messages: 1,
            'companyDetails.companyName': 1,
            'companyDetails.companyLogo': 1
          }
        }
      ]);
  
      res.json(chatsWithCompanyDetails);
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  router.get('/company/:companyId', async (req, res) => {
    try {
      const chats = await Chat.find({ companyId: req.params.companyId });
      res.json(chats);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/company/:companyId/student/:studentId', async (req, res) => {
    const { companyId, studentId } = req.params;
    try {
      let chat = await Chat.findOne({ companyId, studentId });
      if (!chat) {
        chat = new Chat({ companyId, studentId, messages: [] });
        await chat.save();
      }
      res.json(chat);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/send', async (req, res) => {
    const { companyId, studentId, text, sender } = req.body;
    try {
      let chat = await Chat.findOne({ companyId, studentId });
      if (!chat) {
        chat = new Chat({ companyId, studentId, messages: [] });
      }
      chat.messages.push({ text, sender });
      await chat.save();

      const room = `${companyId}-${studentId}`;
      io.to(room).emit('receiveMessage', { chat });

      res.json(chat);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};