import mongoose from 'mongoose';

const mentorChatSchema = new mongoose.Schema({
  mentorId: { type: String, required: true },
  studentId: { type: String, required: true },
  messages: [
    {
      text: { type: String, required: true },
      sender: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

export const MentorChat = mongoose.model('MentorChat', mentorChatSchema);
