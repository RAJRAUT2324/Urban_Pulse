import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './backend/models/User.js';

dotenv.config({ path: './.env' });

const findUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ name: 'Raj Raut' });
        if (user) {
            console.log(`User Found: ID: ${user._id}, Name: ${user.name}, Role: ${user.role}, LegacyScore: ${user.scoreCredit}`);
        } else {
            console.log("User 'Raj Raut' not found.");
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

findUser();
