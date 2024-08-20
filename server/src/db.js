// db.js
import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string
const dbName = 'amile'; // Replace with your database name

let db;

export const connectToMongoDB = async () => {
    if (db) {
        return db;
    }
    
    try {
        const client = await MongoClient.connect(url);
        db = client.db(dbName);
        console.log('Connected to MongoDB');
        return db;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit the application if the connection fails
    }
};

export default db;
