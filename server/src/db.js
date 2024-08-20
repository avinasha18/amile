// import { MongoClient } from 'mongodb';

// const url = 'mongodb://127.0.0.1:27017'; 
// const dbName = 'amile'; 

// let db;

// export const connectToMongoDB = async () => {
//     if (db) {
//         return db;
//     }
    
//     try {
//         const client = await MongoClient.connect(url);
//         db = client.db(dbName);
//         console.log('Connected to MongoDB');
//         return db;
//     } catch (err) {
//         console.error('Failed to connect to MongoDB', err);
//         process.exit(1); 
//     }
// };

// export default db;
