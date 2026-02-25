import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './backend/models/User.js';
import CivicCredits from './backend/models/CivicCredits.js';

dotenv.config();

const checkCredits = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: 'shreyas@example.com' });
        const credits = await CivicCredits.findOne({ userId: user._id });
        console.log('--- CivicCredits in DB ---');
        console.log(JSON.stringify(credits, null, 2));
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkCredits();
