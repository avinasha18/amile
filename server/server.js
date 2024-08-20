import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/amile', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

connectToMongoDB();

app.use('/', userRoutes);
app.use('/', mentorRoutes);
app.use('/', companyRoutes);
app.use('/', internshipRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
