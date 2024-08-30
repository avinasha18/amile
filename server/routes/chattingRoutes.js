import express from 'express';
import { Chat } from '../models/chat.model.js';

const router = express.Router();

export default (io) => {
  router.get('/student/:studentId', async (req, res) => {
    try {
      const chats = await Chat.find({ studentId: req.params.studentId });
      res.json(chats);
    } catch (err) {
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