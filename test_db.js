import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Grievance from './backend/models/Grievance.js';

dotenv.config();

const test = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        console.log('Fetching grievances...');
        const grievances = await Grievance.find({}).sort({ createdAt: -1 });
        console.log('Success! Count:', grievances.length);
        process.exit(0);
    } catch (error) {
        console.error('ERROR:', error);
        process.exit(1);
    }
};

test();
