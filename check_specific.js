import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Grievance from './backend/models/Grievance.js';

dotenv.config({ path: './.env' });

const checkSpecificGrievance = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const ticketId = '699de5c36610eec6f48f0d32';

        const g = await Grievance.findById(ticketId);
        if (g) {
            console.log(`Grievance Found: ID: ${g.grievanceId}, Name: ${g.citizenName}, Reporter: ${g.originalReporter}, Status: ${g.status}, Feedback: ${g.citizenFeedback}`);
        } else {
            console.log("Grievance not found.");
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkSpecificGrievance();
