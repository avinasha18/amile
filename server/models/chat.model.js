import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  messages: [
    {
      text: String,
      sender: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const Chat = mongoose.model('Chat', chatSchema);
export { Chat };
