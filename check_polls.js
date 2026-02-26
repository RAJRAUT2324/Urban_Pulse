import mongoose from 'mongoose';
import Poll from './backend/models/Poll.js';
import dotenv from 'dotenv';

dotenv.config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        const count = await Poll.countDocuments();
        console.log(`Poll count: ${count}`);
        const polls = await Poll.find({ isActive: true });
        console.log(`Active polls: ${polls.length}`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

test();
