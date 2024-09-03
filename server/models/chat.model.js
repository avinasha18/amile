import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
  },
  messages: [
    {
      text: String,
      sender: String,
      timestamp: { type: Date, default: Date.now },
    }
  ]
});

chatSchema.pre('validate', function (next) {
  if (!this.mentorId && !this.companyId) {
    next(new Error('Either mentorId or companyId is required.'));
  } else if (this.mentorId && this.companyId) {
    next(new Error('Only one of mentorId or companyId should be provided.'));
  } else {
    next();
  }
});

const Chat = mongoose.model('Chat', chatSchema);
export { Chat };
