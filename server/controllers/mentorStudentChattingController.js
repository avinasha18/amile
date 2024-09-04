import { MentorChat } from '../models/MentorChat.model.js';

export const getChatsByStudentId = async (req, res) => {
  try {
    const chats = await MentorChat.find({ studentId: req.params.studentId });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getChatsByMentorId = async (req, res) => {
  try {
    const chats = await MentorChat.find({ mentorId: req.params.mentorId });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getChatByMentorAndStudent = async (req, res) => {
  const { mentorId, studentId } = req.params;
  try {
    let chat = await MentorChat.findOne({ mentorId, studentId });
    if (!chat) {
      chat = new MentorChat({ mentorId, studentId, messages: [] });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendMessage = (io) => async (req, res) => {
  const { mentorId, studentId, text, sender } = req.body;
  try {
    let chat = await MentorChat.findOne({ mentorId, studentId });
    if (!chat) {
      chat = new MentorChat({ mentorId, studentId, messages: [] });
    }
    chat.messages.push({ text, sender });
    await chat.save();

    const room = `${mentorId}-${studentId}`;
    io.to(room).emit('receiveMessage', { chat });

    res.json(chat);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: 'Internal server error' });
  }
};
