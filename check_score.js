import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './backend/models/User.js';

dotenv.config();

const checkScore = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: 'shreyas@example.com' });
        console.log(`User: ${user.name}`);
        console.log(`ScoreCredit: ${user.scoreCredit}`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkScore();
